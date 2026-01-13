import { db } from "@/lib/db/drizzle";
import { shopping_list, ingredients, customized_items } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import HeaderWrapper from "@/app/components/HeaderWrapper";

import AbandonList from "@/app/components/shoppingList/AbandonList";
import FinishList from "@/app/components/shoppingList/FinishList";
import FinalAutoList from "@/app/components/shoppingList/FinalAutoList";

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
    .leftJoin(ingredients, eq(shopping_list.ingredient_id, ingredients.id));

  const manualList = await db.select().from(customized_items);
  
  return (
    <div className="flex flex-col">
      <HeaderWrapper header="Ma liste de courses" text="Cochez vos articles" />
      <FinalAutoList items={autoList}/>

      <div className="stickyContainer flex flex-col fixed bottom-20 left-0 right-0 bg-white p-4 gap-2">
        {/* Bouton "J'ai terminé mes courses" - Style "Finaliser ma liste" */}
        <FinishList />
        {/* Bouton "Abandonner" - Style identique */}
        <AbandonList />
      </div>
    </div>
  );
}
