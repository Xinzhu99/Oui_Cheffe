"use client";
import { addToChecked, checkStatus, removeFromChecked } from "@/app/actions/shoppingList";

type Item = {
  id: number;
  ingredientName: string | null;
  quantity: string | null;
  unit: string | null;
  isChecked: boolean;
};

export default function FinalAutoList({ items }: { items: Item[] }) {
  const handleClick = async (id: number) => {
    const data = await checkStatus(id);
    const isChecked = data[0].status
    
    console.log("isChecked",isChecked)
     if(isChecked === false) {
       await addToChecked(id)
     }else{
      await removeFromChecked(id)
     }
  };

  return (
    <div className="relative">
      

      {/* Liste des articles */}
      <div className="p-4 space-y-3">
        {items.map((item) => {

          return (
            <div
              key={item.id}
              onClick={() => handleClick(Number(item.id))}
              className={`
                flex items-center gap-4 p-2 rounded-2xl cursor-pointer
                transition-all duration-300
                ${
                  item.isChecked
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
                    item.isChecked
                      ? "bg-green-500 border-green-500"
                      : "bg-white border-gray-300"
                  }
                `}
              >
                {item.isChecked && (
                  <span className="text-white font-bold">✓</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p
                  className={`
                    font-semibold
                    ${
                      item.isChecked
                        ? "line-through text-gray-500"
                        : "text-gray-800"
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
    </div>
  );
}
