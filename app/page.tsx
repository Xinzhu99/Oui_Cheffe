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
    <div className="flex flex-col min-h-screen pb-32">
      <HeaderWrapper
        header="De quoi tu as envie ?"
        text="Bienvenue à la cuisine de Xinzhu !"
      />

      {/* boutons rapides pour choisir les catégories de plats */}
      <CategoryBar />

      {/*liste des recettes */}
      <RecipesList recipes={recipes} />

      <div className="stickyContainer flex flex-col fixed bottom-13 left-0 right-0 p-4 gap-2">
        <Link
          href="/new-recipe"
          className="block text-center font-bold px-6 py-4 rounded-2xl text-white transition-all duration-300 hover:shadow-xl active:scale-98"
          style={{
            background: 'linear-gradient(135deg, #FF8C61, #FF6B35)',
            boxShadow: '0 8px 24px rgba(255, 107, 53, 0.15)',
          }}
        >
          Proposer une recette
        </Link>
      </div>
    </div>
  );
}
