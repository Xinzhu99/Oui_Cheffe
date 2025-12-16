import { dish_categories, dishes } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import HeaderWrapper from "./components/HeaderWrapper";
import RecipesList from "./components/recipes/RecipesList";
import CategoryBar from "./components/CategoryBar";

export default async function Home({searchParams}) {
  
  // console.log("params", await searchParams.category)
  const params = await searchParams
  const category = params.category
    
  let query = db
    .select({
      dishId: dishes.id,
      dishName: dishes.name,
      time: dishes.prep_time,
      dishCat: dish_categories.name,
    })
    .from(dishes)
    .leftJoin(dish_categories, eq(dish_categories.id, dishes.dish_category_id));
  if (category
  ) {
    query = query.where(eq(dishes.dish_category_id, Number(category)))
  }
    const recipes = await query
  
  return (
    <div className="flex flex-col ">
      <HeaderWrapper
        header="De quoi t'as envie ?"
        text="Bienvenue à la cuisine de Xinzhu !"
      />

      <CategoryBar />

      {/*liste des recettes */}
      <RecipesList recipes={recipes} />
    </div>
  );
}
