import { notFound } from "next/navigation"
import RecipeDetails from "@/app/components/recipes/RecipeDetails"
import { db } from "@/lib/db/drizzle"
import { dish_ingredients, dishes, ingredients } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default async function DishDetails({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id } = await params
  const dishId = Number(id)

  if (isNaN(dishId)) {
    notFound()
  }

  const recipeDetails = await db
    .select({
      dishId: dishes.id,
      dishName: dishes.name,
      instructions: dishes.instructions,
      prepTime: dishes.prep_time,
      ingredientId: ingredients.id,
      ingredientName: ingredients.name,
      ingredientUnit: ingredients.unit,
      quantity: dish_ingredients.quantity,
    })
    .from(dishes)
    .leftJoin(dish_ingredients, eq(dish_ingredients.dish_id, dishes.id))
    .leftJoin(ingredients, eq(ingredients.id, dish_ingredients.ingredient_id))
    .where(eq(dishes.id, dishId))

  if (recipeDetails.length === 0) {
    notFound()
  }

  const recipe = {
    dishId: recipeDetails[0].dishId,
    dishName: recipeDetails[0].dishName,
    instructions: recipeDetails[0].instructions,
    prepTime: recipeDetails[0].prepTime,
    ingredients: recipeDetails
      .filter(item => item.ingredientId !== null)
      .map(item => ({
        id: item.ingredientId!,
        name: item.ingredientName!,
        unit: item.ingredientUnit!,
        quantity: item.quantity!,
      }))
  }

  return <RecipeDetails recipe={recipe} />
}