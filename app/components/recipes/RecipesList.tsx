import Image from "next/image";
import { Recipe } from "@/lib/types/recipes";
import Link from "next/link";
import { DishImage } from "../images/DishImage";

export default function RecipesList({
  recipes,
}: {
  recipes: Array<{
    dishId: number;
    dishName: string;
    time: number | null;
    dishCat: string | null;
    dishImage: string | null;
  }>;
}) {
  return (
    <>
      {recipes.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20 px-5">
          <div className="text-6xl mb-4 opacity-30">🍳</div>
          <h3
            className="text-xl font-bold mb-2 text-gray-600"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Aucune recette trouvée
          </h3>
          <p className="text-sm text-gray-600 opacity-80">
            Essaie une autre catégorie ou propose ta recette !
          </p>
        </div>
      )}

      {/* Grille de recettes */}
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Link
            href={`/dish/${recipe.dishId}`}
            key={recipe.dishId}
            className="recipe-card group relative flex flex-col overflow-hidden rounded-[20px] bg-amber-50 shadow-[0_4px_16px_rgba(45,106,79,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(45,106,79,0.15)] active:scale-[0.98]"
          >
            {/* Image Container */}
            <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
              <DishImage
                dishName={recipe.dishName}
                dbImageUrl={recipe.dishImage}
                className="h-48 w-full rounded-t-lg"
              />

              {/* Badge temps */}
              {recipe.time && (
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-amber-50 px-3.5 py-2 text-sm font-semibold text-orange-400 shadow-lg backdrop-blur-sm">
                  <span>⏱</span>
                  <span>{recipe.time} min</span>
                </div>
              )}
            </div>

            {/* Info Container */}
            <div className="flex flex-col gap-2 p-[18px]">
              {/* Catégorie */}
              {recipe.dishCat && (
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {recipe.dishCat}
                </div>
              )}

              {/* Titre */}
              <h3 className=" text-[22px] font-bold leading-tight text-orange-500">
                {recipe.dishName}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
