import { dish_categories, dishes } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";
import HeaderWrapper from "./components/HeaderWrapper";
import RecipesList from "./components/recipes/RecipesList";
import CategoryBar from "./components/CategoryBar";

export default async function Home({ searchParams } : {
  searchParams : { category?: string }
}) {
  console.log("params", await searchParams)
  const params = await searchParams;
  const category = params.category;

  let query = db
    .select({
      dishId: dishes.id,
      dishName: dishes.name,
      time: dishes.prep_time,
      dishCat: dish_categories.name,
      dishImage: dishes.image_url
    })
    .from(dishes)
    .leftJoin(dish_categories, eq(dish_categories.id, dishes.dish_category_id));
  if (category) {
    const recipes = await query.where(eq(dishes.dish_category_id, Number(category)));
  } 
    const recipes = await query;


  return (
    <div className="flex flex-col ">
      <HeaderWrapper
        header="De quoi t'as envie ?"
        text="Bienvenue à la cuisine de Xinzhu !"
      />

      {/* boutons rapides pour choisir les catégories de plats */}
      <CategoryBar />

      {/*liste des recettes */}
      <RecipesList recipes={recipes} />
    </div>
  );
}
