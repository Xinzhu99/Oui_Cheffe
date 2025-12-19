import Image from "next/image";
import ShowDishDetails from "./ShowDishDetails";
import { Recipe } from "@/lib/types/recipes";

export default function RecipesList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <div
          key={recipe.dishId}
          className="recipe-card group relative flex flex-col overflow-hidden rounded-[20px] bg-amber-50 shadow-[0_4px_16px_rgba(45,106,79,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(45,106,79,0.15)] active:scale-[0.98]"
        >
          {/* Image Container */}
          <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
            <Image 
              src="/mockup.jpg" 
              alt={recipe.dishName}
              width={400}
              height={200}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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
            <h3 className=" text-[22px] font-bold leading-tight text-orange-400">
              {recipe.dishName}
            </h3>

              <ShowDishDetails id={recipe.dishId} />
          
          </div>
        </div>
      ))}
    </div>
  );
}