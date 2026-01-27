import { dish_categories, dishes } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";
import { eq } from "drizzle-orm";

import RecipesList from "./components/recipes/RecipesList";
import CategoryBar from "./components/CategoryBar";
import HeaderWrapper from "./components/HeaderWrapper";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  console.log("params", await searchParams);
  const params = await searchParams;
  const category = params.category;

  let query = db
    .select({
      dishId: dishes.id,
      dishName: dishes.name,
      time: dishes.prep_time,
      dishCat: dish_categories.name,
      dishImage: dishes.image_url,
    })
    .from(dishes)
    .leftJoin(dish_categories, eq(dish_categories.id, dishes.dish_category_id));
  if (category) {
    const recipes = await query.where(
      eq(dishes.dish_category_id, Number(category)),
    );
  }
  const recipes = await query;

  return (
    <div className="flex flex-col pt-4">
      <HeaderWrapper
        header="De quoi t'as envie ?"
        text="Bienvenue à la cuisine de Xinzhu !"
      />

      {/* boutons rapides pour choisir les catégories de plats */}
      <CategoryBar />

      {/*liste des recettes */}
      <RecipesList recipes={recipes} />

      <div className="stickyContainer flex flex-col fixed bottom-20 left-0 right-0 p-4 gap-2">
        <Link
          href="/new-recipe"
          className="text-center bg-orange-400 p-2 w-full text-white font-extrabold rounded-2xl sticky bottom-2 cursor-pointer"
        >
          Proposer une recette
        </Link>
      </div>
    </div>
  );
}
