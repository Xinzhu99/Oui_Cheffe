import { dish_categories, dishes } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import Image from 'next/image'
import ShowDishDetails from "./component/ShowDishDetails";

export default async function Home() {
  const recipes = await db
    .select({
      dishId:dishes.id,
      dishName: dishes.name,
      time: dishes.prep_time,
      dishCat: dish_categories.name,
    })
    .from(dishes)
    .leftJoin(dish_categories, eq(dish_categories.id, dishes.dish_category_id));
  console.log(recipes);

  return (
    <div className="flex flex-wrap justify-evenly gap-4 p-4">

      {recipes.map((recipe) => (
        <div key={recipe.dishId} className="recipeCard flex flex-col items-center justify-center bg-amber-200 w-60 rounded-2xl text-center">
          <h1 className="text-xl">{recipe.dishName}</h1>
          <Image src="/mockup.jpg"alt="recipe" width="200" height="150"/>
          <h2>{recipe.dishCat}</h2>
          <h2>{recipe.time} min</h2>
          
          < ShowDishDetails id={recipe.dishId}/>
        </div>
      ))}
    </div>
  );
}
