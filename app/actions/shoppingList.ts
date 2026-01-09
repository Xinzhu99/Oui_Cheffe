"use server"

import { db } from "@/lib/db/drizzle"
import {
  customized_items,
  dish_ingredients,
  dishes,
  ingredients,
  menu,
  shopping_list,
} from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { IngredientOfList } from "@/lib/types/menu"

const DEFAULT_SERVINGS = 2

// ==========================================
// Créer la liste depuis le menu
// ==========================================
export default async function addToShoppingList() {
  try {
    const menuWithIng = await db
      .select({
        menuId: menu.id,
        servings: menu.servings,
        dishId: menu.dish_id,
        dishName: dishes.name,
        ingredientsId: ingredients.id,
        quantity: dish_ingredients.quantity,
        ingredientsName: ingredients.name,
        ingredientsUnit: ingredients.unit,
      })
      .from(menu)
      .leftJoin(dishes, eq(menu.dish_id, dishes.id))
      .leftJoin(dish_ingredients, eq(dishes.id, dish_ingredients.dish_id))
      .leftJoin(ingredients, eq(dish_ingredients.ingredient_id, ingredients.id))

    if (menuWithIng.length === 0) {
      return {
        success: false,
        message: "Ajoutez des plats au menu pour créer votre liste",
      }
    }

    // Ajuste les quantités
    const adjustedMenuWithIng = menuWithIng.map((ing: IngredientOfList) => {
      const adjustedQty = Math.round(
        (Number(ing.quantity) / DEFAULT_SERVINGS) * ing.servings
      )

      return {
        ingredientId: ing.ingredientsId,
        ingredientName: ing.ingredientsName,
        unit: ing.ingredientsUnit,
        adjustedQuantity: adjustedQty,
        dishName: ing.dishName,
      }
    })

    // Groupe les ingrédients identiques
    const mergedList = adjustedMenuWithIng.reduce((acc, ing) => {
      const existing = acc.find((item) => item.ingredientId === ing.ingredientId)

      if (existing) {
        existing.adjustedQuantity += ing.adjustedQuantity
      } else {
        acc.push({ ...ing })
      }

      return acc
    }, [] as typeof adjustedMenuWithIng)

    // Vide la liste précédente
    await db.delete(shopping_list)

    // Insère les ingrédients
    for (const ing of mergedList) {
      await db.insert(shopping_list).values({
        ingredient_id: Number(ing.ingredientId),
        quantity: ing.adjustedQuantity.toFixed(2),
        is_checked: false,
      })
    }

    revalidatePath("/my-list")

    return {
      success: true,  // ✅ Corrigé
      message: `✅ Liste créée avec ${mergedList.length} ingrédients !`,
    }
  } catch (error) {
    console.error("❌ Erreur addToShoppingList:", error)
    return {
      success: false,
      message: "Erreur lors de la création",
    }
  }
}

// ==========================================
// Supprimer un ingrédient
// ==========================================
export async function deleteFromShoppingList(
  ingredient_id: number
): Promise<{ success: boolean; message: string }> {
  try {
    const result = await db
      .delete(shopping_list)
      .where(eq(shopping_list.ingredient_id, ingredient_id))
      .returning()

    if (result.length === 0) {
      return {
        success: false,
        message: "Ingrédient introuvable",
      }
    }

    revalidatePath("/my-list")

    return {
      success: true,
      message: "✅ Ingrédient retiré !",
    }
  } catch (error) {
    console.error("❌ Erreur deleteFromShoppingList:", error)
    return {
      success: false,
      message: "Erreur lors de la suppression",
    }
  }
}



// ==========================================
// Abandonner la liste
// ==========================================
export async function abandonList(): Promise<void> {
    
    await db.delete(shopping_list)
    await db.delete(customized_items)


    // ✅ Revalide les pages
    revalidatePath("/my-list")
    revalidatePath("/my-dishes")

    // ✅ Redirige (n'atteint jamais le return après)
    redirect("/my-dishes")
 
}