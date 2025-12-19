"use server";

import { db } from "@/lib/db/drizzle";
import {
  dish_ingredients,
  dishes,
  ingredients,
  menu,
  shopping_list,
} from "@/lib/db/schema";
import { Ingredient } from "@/lib/types/recipes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { IngredientOfList } from "@/lib/types/menu";

export default async function addToShoppingList() {
  const defaulServings = 2
  try {
    const menuWithIng = await db
      .select({
        menuId: menu.id,
        servings: menu.servings,
        dishId: menu.dish_id,
        dishName: dishes.name,

        //liste des ingrédients
        ingredientsId: ingredients.id,
        quantity: dish_ingredients.quantity,
        ingredientsName: ingredients.name,
        ingredientsUnit: ingredients.unit,
      })
      .from(menu)
      .leftJoin(dishes, eq(menu.dish_id, dishes.id))
      .leftJoin(dish_ingredients, eq(dishes.id, dish_ingredients.dish_id))
      .leftJoin(
        ingredients,
        eq(dish_ingredients.ingredient_id, ingredients.id)
      );

    if (menuWithIng.length === 0) {
      return {
        success: false,
        message: "Ajouter un plat au menu pour créer votre liste",
      };
    }

    console.log("🎄",menuWithIng)
    //fonction pour ajuster les qqt
    const adjustedMenuWithIng = menuWithIng.map((ing: IngredientOfList) => {
      const adjustedQty = Math.round((ing.quantity / defaulServings) * ing.servings);

      return {
        ingredientId: ing.ingredientsId,
        ingredientName: ing.ingredientsName,
        unit: ing.ingredientsUnit,
        adjustedQuantity: adjustedQty,
        dishName: ing.dishName,
      };
    });

    //merger les ingrédients répétitifs
    let mergedList = [] ;
      console.log("🎅",adjustedMenuWithIng)
      adjustedMenuWithIng.forEach((ing) => {
        const obj = mergedList.find(
          (o) => o.ingredientId === ing.ingredientId
        );
        if (obj) {
          obj.quantity =
            obj.adjustedQuantity + ing.adjustedQuantity;
        } else {
          mergedList.push(ing);
        }
      });



    // ✅ Insère dans shopping_list
    // Vide la liste précédente
    await db.delete(shopping_list);

    // Insère chaque ingrédient
    for (const ing of mergedList) {
      await db.insert(shopping_list).values({
        ingredient_id: ing.ingredientId,
        quantity: ing.adjustedQuantity.toFixed(2),
        source: "recipe",
        is_checked: false,
      });
    }
    revalidatePath("/my-list");

    return {
      sucess: true,
      message: `✅ Liste créée avec ${mergedList.length} ingrédients !`,
    };
  } catch (error) {
    console.error("❌ Erreur:", error);
    return {
      success: false,
      message: "Erreur lors de la création",
    };
  }
}

export async function deleteFromShoppingList (ingredient_id) {
  try {
    const ing = await db.select().from(shopping_list).where(eq(shopping_list.ingredient_id, ingredient_id))

    console.log("😁",ing)
    if (ing.length === 0) {
      return ({
        sucess: false,
        message: "L'ingredient choisi n'existe pas dans votre liste"
      })
    }

    await db.delete(shopping_list).where(eq(shopping_list.ingredient_id, ingredient_id))
    revalidatePath("/my-list")

    return {
        success: true,
        message: "L'ingrédient a été retiré !",
      };

  } catch (error) {
    console.error("Having problem of API", error)
    return {
      sucess: false,
      message:"API erreur"
    }
  }
}