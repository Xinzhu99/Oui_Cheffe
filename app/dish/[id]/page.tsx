import DishDetailsClient from "@/app/component/DishDetailsClient";
import { db } from "@/lib/db/drizzle";
import { dish_ingredients, dishes, ingredients } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
// type Dish = typeof dishes.$inferSelect
// type DishIngredient = typeof dish_ingredients.$inferSelect
// type Ingredient = typeof ingredients.$inferSelect

export default async function DishDetails({ params }) {
  const { id } = await params;

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
    .innerJoin(dish_ingredients, eq(dish_ingredients.dish_id, dishes.id))
    .innerJoin(ingredients, eq(ingredients.id, dish_ingredients.ingredient_id))
    .where(eq(dishes.id, id));
    console.log(recipeDetails)
  //transformer en un seul objet avec une liste d'ingrédients
  const recipe =
    recipeDetails.length > 0
      ? {
          dishName: recipeDetails[0].dishName,
          dishId: recipeDetails[0].dishId,
          instruction: recipeDetails[0].instructions,
          time: recipeDetails[0].prepTime,
          ingredients: recipeDetails.map((row) => ({
            id: row.ingredientId,
            name: row.ingredientName,
            unit: row.ingredientUnit,
            quantity: row.quantity,
          })),
        }
      : null;

  console.log("recipe", recipeDetails);
  
  return (
    <DishDetailsClient recipe={recipe} />
  );
}
