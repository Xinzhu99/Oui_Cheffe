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
      const adjustedQty = Math.round((ing.quantity / 2) * ing.servings);

      return {
        ingredientId: ing.ingredientsId,
        ingredientName: ing.ingredientsName,
        unit: ing.ingredientsUnit,
        adjustedQuantity: adjustedQty,
        dishName: ing.dishName,
      };
    });

    // ✅ 3. Insère dans shopping_list
    // Vide la liste précédente
    await db.delete(shopping_list);

    // Insère chaque ingrédient
    for (const ing of adjustedMenuWithIng) {
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
      message: `✅ Liste créée avec ${adjustedMenuWithIng.length} ingrédients !`,
    };
  } catch (error) {
    console.error("❌ Erreur:", error);
    return {
      success: false,
      message: "Erreur lors de la création",
    };
  }
}
