import { db } from "@/lib/db/drizzle";
import { ingredients, shopping_list } from "@/lib/db/schema";
import HeaderWrapper from "../components/HeaderWrapper";
import ShoppingList from "../components/shoppingList/ShoppingList";
import { eq } from "drizzle-orm";
import ManualAdd from "../components/shoppingList/ManualAdd";

export default async function MyList() {
  const listFromRecipe = await db
    .select()
    .from(shopping_list)
    .leftJoin(ingredients, eq(ingredients.id, shopping_list.ingredient_id))
    .where(eq(shopping_list.source, "recipe"));

  const listFromManual = await db
    .select()
    .from(shopping_list)
    .leftJoin(ingredients, eq(ingredients.id, shopping_list.ingredient_id))
    .where(eq(shopping_list.source, "manual"));

  return (
    <div>
      <HeaderWrapper header="Ma liste" text="Vos prochaines courses" />

      <div className=" text-[22px] font-bold leading-tight text-orange-400 m-4">
        🍳Depuis mes recttes
      </div>

      <ShoppingList listByIngredient={listFromRecipe} />

      <div className=" text-[22px] font-bold leading-tight text-orange-400 m-4">
        🛒Ajoutés manuellement
      </div>
      {/* barre de recherche  */}
      
      <ManualAdd />

      <ShoppingList listByIngredient={listFromManual} />

      <button className="bg-orange-400 p-2 m-4 text-white font-extrabold rounded-2xl sticky bottom-2 cursor-pointer">
        Finaliser ma liste
      </button>

      <button className="bg-orange-400 p-2 m-4 text-white font-extrabold rounded-2xl sticky bottom-2 cursor-pointer">
        Abandonner
      </button>
    </div>
  );
}
