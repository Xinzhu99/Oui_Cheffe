import { dish_categories, dishes } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import HeaderWrapper from "./components/HeaderWrapper";
import RecipesList from "./components/recipes/RecipesList";
import CategoryBar from "./components/CategoryBar";

export default async function Home({
  searchParams
}:{
  searchParams : {category ?: string}
} ) {
  const recipes = await db
    .select({
      dishId: dishes.id,
      dishName: dishes.name,
      time: dishes.prep_time,
      dishCat: dish_categories.name,
    })
    .from(dishes)
    .leftJoin(dish_categories, eq(dish_categories.id, dishes.dish_category_id));

  
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
