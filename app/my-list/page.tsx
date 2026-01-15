import { db } from "@/lib/db/drizzle";
import { customized_items, ingredients, shopping_list } from "@/lib/db/schema";
import HeaderWrapper from "../components/HeaderWrapper";
import ShoppingList from "../components/shoppingList/ShoppingList";
import { eq } from "drizzle-orm";
import ManualAdd from "../components/shoppingList/ManualAdd";
import AbandonList from "../components/shoppingList/AbandonList";
import Link from "next/link";
import CustomizedList from "../components/customized/CustomizedList";

export default async function MyList() {
  const listFromRecipeRaw = await db
    .select()
    .from(shopping_list)
    .leftJoin(ingredients, eq(ingredients.id, shopping_list.ingredient_id));

  const customizedData = await db.select().from(customized_items);

  // console.log("xxxxxxxxxxxxxx",customizedData)

  // ✅ Transforme avec valeur par défaut pour null
  const listFromRecipe = listFromRecipeRaw.map((item) => ({
    id: item.shopping_list.id,
    ingredientName: item.ingredients?.name || "Inconnu",
    quantity: item.shopping_list.quantity || "0", // ✅ Gère null
    unit: item.ingredients?.unit || "",
    isChecked: item.shopping_list.is_checked,
  }));

  return (
    <div className="pb-32">
      <HeaderWrapper header="Ma liste" text="Vos prochaines courses" />

      <div className="text-[22px] font-bold leading-tight text-orange-400 m-4">
        🍳 Depuis mes recettes
      </div>
      <ShoppingList listByIngredient={listFromRecipe} />

      <div className="text-[22px] font-bold leading-tight text-orange-400 m-4">
        🛒 Ajoutés manuellement
      </div>
      <ManualAdd />
      <CustomizedList items={customizedData} />

      <div className="stickyContainer flex flex-col fixed bottom-20 left-0 right-0 bg-white p-4 gap-2">
        {(listFromRecipe.length > 0 || customizedData.length > 0) && (
          <>
            <Link href="/my-list/final">
              <button className="w-full bg-orange-400 p-2 text-white font-extrabold rounded-2xl cursor-pointer hover:bg-orange-500 transition-colors">
                Finaliser ma liste
              </button>
            </Link>
            <AbandonList />
          </>
        )}
      </div>
    </div>
  );
}
