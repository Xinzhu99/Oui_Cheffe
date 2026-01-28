import { db } from "@/lib/db/drizzle";
import { shopping_list, ingredients, customized_items } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import HeaderWrapper from "@/app/components/HeaderWrapper";

import FinishList from "@/app/components/shoppingList/FinishList";
import FinalAutoList from "@/app/components/shoppingList/FinalAutoList";
import FinalCustomizedList from "@/app/components/customized/FinalCustomizedList";

export default async function FinalListPage() {
  // Récupère tous les articles
  const autoList = await db
    .select({
      id: shopping_list.id,
      ingredientName: ingredients.name,
      quantity: shopping_list.quantity,
      unit: ingredients.unit,
      isChecked: shopping_list.is_checked,
    })
    .from(shopping_list)
    .leftJoin(ingredients, eq(shopping_list.ingredient_id, ingredients.id))
      .orderBy(asc(shopping_list.id)); // ← Trie par id croissant

  const customizedList = await db.select().from(customized_items).orderBy(asc(customized_items.id));
  console.log("manualList", customizedList)
  
  return (
    <div className="flex flex-col">
      <HeaderWrapper header="Ma liste de courses" text="Coche les articles achetés" />
      <FinalAutoList items={autoList}/>
      <FinalCustomizedList items={customizedList} />

      <div className="stickyContainer flex flex-col fixed bottom-20 left-0 right-0 bg-white p-4 gap-2">
        {/* Bouton "J'ai terminé mes courses" - Style "Finaliser ma liste" */}
        <FinishList />
      </div>
    </div>
  );
}
