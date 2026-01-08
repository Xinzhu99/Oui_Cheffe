"use client";
import { useState } from "react";
import { abandonList } from "@/app/actions/shoppingList";
import AbandonList from "./AbandonList";
import FinishList from "./FinishList";

type Item = {
  id: number;
  ingredientName: string | null;
  quantity: string | null;
  unit: string | null;
  isChecked: boolean;
};

export default function FinalListClient({ items }: { items: Item[] }) {
  const [checkedItems, setCheckedItems] = useState<number[]>(
    items.filter((item) => item.isChecked).map((item) => item.id)
  );
  const [isLoading, setIsLoading] = useState(false);

  const toggleItem = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    const confirmed = window.confirm(
      "✅ Avez-vous terminé vos courses ?\n\nLa liste sera supprimée."
    );
    if (!confirmed) return;

    setIsLoading(true);
    await abandonList();
  };

  const handleAbandon = async () => {
    const confirmed = window.confirm(
      "⚠️ Êtes-vous sûr de vouloir abandonner cette liste ?"
    );
    if (!confirmed) return;

    setIsLoading(true);
    await abandonList();
  };

  return (
    <div className="relative pb-40">
      {/* Badge statut */}
      <div className="p-4">
        <div className="p-4 bg-green-100 rounded-2xl text-center">
          <p className="text-green-800 font-bold">✅ Liste finalisée</p>
          <p className="text-sm text-green-600 mt-1">
            {checkedItems.length} / {items.length} articles cochés
          </p>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="p-4 space-y-3">
        {items.map((item) => {
          const isChecked = checkedItems.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`
                flex items-center gap-4 p-4 rounded-2xl cursor-pointer
                transition-all duration-300
                ${
                  isChecked
                    ? "bg-gray-100 opacity-60"
                    : "bg-white shadow-md hover:shadow-lg"
                }
              `}
            >
              {/* Checkbox */}
              <div
                className={`
                  w-7 h-7 rounded-lg border-3 flex items-center justify-center
                  transition-all
                  ${
                    isChecked
                      ? "bg-green-500 border-green-500"
                      : "bg-white border-gray-300"
                  }
                `}
              >
                {isChecked && <span className="text-white font-bold">✓</span>}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p
                  className={`
                    font-semibold
                    ${
                      isChecked ? "line-through text-gray-500" : "text-gray-800"
                    }
                  `}
                >
                  {item.ingredientName}
                </p>
                {item.quantity && (
                  <p className="text-sm text-gray-500">
                    {item.quantity} {item.unit}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="stickyContainer flex flex-col fixed bottom-20 left-0 right-0 bg-white p-4 gap-2">
        {/* Bouton "J'ai terminé mes courses" - Style "Finaliser ma liste" */}
        <FinishList />
        {/* Bouton "Abandonner" - Style identique */}
        <AbandonList />
      </div>
    </div>
  );
}
