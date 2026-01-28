// APRÈS ✅
"use client";
import { deleteFromCustomized } from "@/app/actions/customized";

export default function CustomizedList({
  items,
}: {
  items: Array<{
    id: number;
    name: string;
  }>;
}) {
  const handleClick = async (id: number) => {
    await deleteFromCustomized(id);
  };

  if (items.length === 0) {
    return null; // Pas d'items = pas d'affichage
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`
            flex items-center justify-between p-2 rounded-xl border border-gray-200 transition-all
          `}
          
        >
          {/* Checkbox visuel */}
          <div className="flex items-center gap-3 flex-1">
            

            <h3
              className={`text-base font-semibold flex-1 ${
                item.is_checked ? 'line-through text-gray-400' : 'text-gray-900'
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {item.name}
            </h3>
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