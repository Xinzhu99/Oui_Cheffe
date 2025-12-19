import { db } from "@/lib/db/drizzle";
import { ingredients, shopping_list } from "@/lib/db/schema";
import HeaderWrapper from "../components/HeaderWrapper";
import ShoppingList from "../components/shoppingList/ShoppingList";
import { eq } from "drizzle-orm";

export default async function MyList() {
  const listByIngredient = await db.select().from(shopping_list).leftJoin(ingredients, eq(ingredients.id, shopping_list.ingredient_id))

  return (
    <div >
      <HeaderWrapper header="Ma liste"
      text="Vos prochaines courses"/>

      <div className=" text-[22px] font-bold leading-tight text-orange-400 m-4">🍳Depuis mes recttes</div>

      <ShoppingList listByIngredient={listByIngredient}/>

      <div className=" text-[22px] font-bold leading-tight text-orange-400 m-4">🛒Ajoutés manuellement</div>
    </div>
  );
}
