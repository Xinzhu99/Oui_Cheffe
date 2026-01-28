// APRÈS ✅
"use client";
import { deleteFromShoppingList } from "@/app/actions/shoppingList";

export default function ShoppingList({
  listByIngredient,
}: {
  listByIngredient: Array<{
    id: number;
    ingredientName: string;
    quantity: string;
    unit: string;
  }>;
}) {
  const handleClick = async (id: number) => {
    await deleteFromShoppingList(id);
  };

  if (listByIngredient.length === 0) {
    return null; // Géré par SectionCard
  }

  return (
    <div className="space-y-1">
      {listByIngredient.map((item, index) => (
        <div
          key={item.id}
          className={`
            flex items-center justify-between p-3 rounded-xl border border-gray-200 transition-all
          `}
        >

          <div className="flex items-center gap-2 flex-1">
            <div className="flex-1">
              <h3
                className="text-base font-semibold text-gray-900'
                "
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {item.ingredientName}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {Math.round(Number(item.quantity))} {item.unit}
              </p>
            </div>
          </div>

          {/* Bouton supprimer */}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-all active:scale-95"
            onClick={() => handleClick(item.id)}
            title="Supprimer"
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}