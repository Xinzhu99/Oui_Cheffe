import { db } from "@/lib/db/drizzle"
import { shopping_list, ingredients } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import HeaderWrapper from "@/app/components/HeaderWrapper"
import FinalList from "@/app/components/shoppingList/FinalList"

export default async function FinalListPage() {
  // Récupère tous les articles
  const list = await db
    .select({
      id: shopping_list.id,
      ingredientName: ingredients.name,
      quantity: shopping_list.quantity,
      unit: ingredients.unit,
      isChecked: shopping_list.is_checked,
    })
    .from(shopping_list)
    .leftJoin(ingredients, eq(shopping_list.ingredient_id, ingredients.id))

  return (
    <div className="flex flex-col">
      <HeaderWrapper
        header="Ma liste de courses"
        text="Cochez vos articles"
      />
      <FinalList items={list} />
    </div>
  )
}