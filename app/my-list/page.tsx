import { db } from "@/lib/db/drizzle";
import { customized_items, ingredients, shopping_list } from "@/lib/db/schema";
import HeaderWrapper from "../components/HeaderWrapper";
import ShoppingList from "../components/shoppingList/ShoppingList";
import { eq } from "drizzle-orm";
import ManualAdd from "../components/shoppingList/ManualAdd";
import AbandonList from "../components/shoppingList/AbandonList";
import Link from "next/link";
import CustomizedList from "../components/customized/CustomizedList";
import SectionCard from "../components/shoppingList/SectionCard";

export default async function MyList() {
  const listFromRecipeRaw = await db
    .select()
    .from(shopping_list)
    .leftJoin(ingredients, eq(ingredients.id, shopping_list.ingredient_id));

  const customizedData = await db.select().from(customized_items);

  // ✅ Transforme avec valeur par défaut pour null
  const listFromRecipe = listFromRecipeRaw.map((item) => ({
    id: item.shopping_list.id,
    ingredientName: item.ingredients?.name || "Inconnu",
    quantity: item.shopping_list.quantity || "0", // ✅ Gère null
    unit: item.ingredients?.unit || "",
    isChecked: item.shopping_list.is_checked,
  }));

  return (
    <div className="pb-20">
      <HeaderWrapper header="Mes listes" text="Mes prochaines courses" />

      {/* Section 1 : Depuis recettes */}
      <div className="mx-4 mb-6">
        <SectionCard
          title="🍳 Depuis mes recettes"
          isEmpty={listFromRecipe.length === 0}
          emptyMessage="Ajoute des recettes à ton menu"
        >
          <ShoppingList listByIngredient={listFromRecipe} />
        </SectionCard>
      </div>

      {/* Section 2 : Manuel */}
      <div className="mx-4 mb-6">
        <SectionCard title="🛒 Ajoutés manuellement" isEmpty={false}>
          <ManualAdd />
          <CustomizedList items={customizedData} />
        </SectionCard>
      </div>

      {/* Boutons en bas */}
      <div
        className="fixed bottom-16 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50"
        style={{ boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)" }}
      >
        {(listFromRecipe.length > 0 || customizedData.length > 0) && (
          <div className="flex gap-3 justify-between">

            {/* Bouton Finaliser (principal) */}
            <Link href="/my-list/final" >
              <button
                className="w-full h-full px-4 py-4 rounded-2xl font-bold text-white transition-all "
                style={{
                  background: "linear-gradient(135deg, #FF8C61, #FF6B35)",
                  boxShadow: "0 8px 24px rgba(255, 107, 53, 0.15)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                Je pars aux courses
              </button>
            </Link>

            {/* Bouton Abandonner (secondaire) */}
            <AbandonList />
          </div>
        )}
      </div>
    </div>
  );
}
