import DishDetailsClient from "@/app/components/DishDetailsClient";
import { db } from "@/lib/db/drizzle";
import { dish_ingredients, dishes, ingredients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function DishDetails({ params }) {
  const { id } = await params;
  // console.log("id", id)

  //requête pour recevoir tous les détails liés au recipe choisi
  const recipeDetails = await db
    .select({
      dishId: dishes.id,
      dishName: dishes.name,
      instructions: dishes.instructions,
      prepTime: dishes.prep_time,

      // Informations des ingrédients
      ingredientId: ingredients.id,
      ingredientName: ingredients.name,
      ingredientUnit: ingredients.unit,
      quantity: dish_ingredients.quantity,
    })
    .from(dishes)
    .leftJoin(dish_ingredients, eq(dish_ingredients.dish_id, dishes.id))
    .leftJoin(ingredients, eq(ingredients.id, dish_ingredients.ingredient_id))
    .where(eq(dishes.id, id));
    
    console.log("recipe",recipeDetails)

  //transformer en un seul objet avec une liste d'ingrédients
  const recipe = 
      recipeDetails.length > 0 ? 
      {
      dishId: recipeDetails[0].dishId,
      dishName: recipeDetails[0].dishName,
      instructions: recipeDetails[0].instructions,
      prepTime: recipeDetails[0].prepTime,
      ingredients: recipeDetails.map((ingredient)=>
        ({id: ingredient.ingredientId,
          name: ingredient.ingredientName,
          unit: ingredient.ingredientUnit,
          quantity: ingredient.quantity
        }))

    } : null
// console.log("recipeCOnsolidé", recipe);
  
  return (
    <DishDetailsClient recipe={recipe} />
  );
}
