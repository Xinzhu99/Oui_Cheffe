"use server";

import { db } from "@/lib/db/drizzle";
import {
  dish_categories,
  dish_ingredients,
  dishes,
  ingredients,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { FormData } from "groq-sdk/_shims/node-types.mjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

export async function addToRecipes(formData: FormData) {
  try {
    const prepTime = Number(formData.get("prep-time") as string);
    const dishName = formData.get("name") as string;
    const categoryName = formData.get("category") as string;
    const instructions = formData.get("instructions") as string;

    console.log("📋 Plat:", dishName);
    console.log("⏱️ Temps:", prepTime);
    console.log("🏷️ Catégorie:", categoryName);

    //extraire les ingrédients
    let ingredientsList = [];
    let i = 0;
    while (formData.has(`ingredient_name_${i}`)) {
      const ingredientName = formData.get(`ingredient_name_${i}`) as string;
      const quantity = Number(formData.get(`ingredient_qqt_${i}`) as string);
      const unit = formData.get(`ingredient_unit_${i}`) as string;

      ingredientsList.push({
        name: ingredientName,
        quantity: quantity,
        unit: unit,
      });

      i++;
    }
    console.log("🥕 Ingrédients trouvés:", ingredientsList);

    //find or create pour les cats de dishes
    const dishCategory = await db
      .select({ id: dish_categories.id })
      .from(dish_categories)
      .where(eq(dish_categories.name, categoryName))
      .limit(1);

    let categoryId;
    if (dishCategory.length === 0) {
      const [newCategory] = await db
        .insert(dish_categories)
        .values({ name: categoryName })
        .returning({ id: dish_categories.id });

      categoryId = newCategory.id;
    } else {
      categoryId = dishCategory[0].id;
    }

    //insérer les infos dans dishes
    const [newDish] = await db
      .insert(dishes)
      .values({
        name: dishName,
        prep_time: prepTime,
        instructions: instructions,
        dish_category_id: categoryId,
      })
      .returning({ id: dishes.id });
    console.log("Plat crée !!!!!:", newDish);

    //insérer le nom d'ingredient et l'unité dans la table ingredients depuis le tableau ingredientsList
    //boucler sur le tableau, pour chaque item {name, quantity, unit}
    //vérifier si l'ingreident existe : si oui : retourner le id; sinon, créer l'ingredient et attacher l'unit et
    for (const ingredientData of ingredientsList) {
      //find or create
      let ingredient = await db
        .select()
        .from(ingredients)
        .where(eq(ingredients.name, ingredientData.name))
        .limit(1);

      let ingredientId;
      if (ingredient.length === 0) {
        //créer l'ingredient

        const [newIngredientId] = await db
          .insert(ingredients)
          .values({
            name: ingredientData.name,
            unit: ingredientData.unit,
          })
          .returning({ id: ingredients.id });
        ingredientId = newIngredientId.id;
      } else {
        ingredientId = ingredient[0].id;
      }

      // 4.2 Créer la liaison dish_ingredients
      await db.insert(dish_ingredients).values({
        dish_id: newDish.id,
        ingredient_id: ingredientId,
        quantity: ingredientData.quantity.toString(), // Drizzle peut vouloir une string pour decimal
      });

      console.log("✅ Liaison créée pour", ingredientData.name);
    }
    
    revalidatePath("/"); // Recharge les données de la page d'accueil
    revalidatePath("/my-dishes"); // Recharge les données de mes plats
        revalidatePath("/new-recipe")

    return {
      success: true,
      message: "Recette enregistrée avec succès !",
      dishId: newDish.id,
    };

  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement:", error);
    return {
      success: false,
      message: "Erreur lors de l'enregistrement de la recette",
    };
  }
}
