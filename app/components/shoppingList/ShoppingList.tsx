"use client"

import { deleteFromShoppingList } from "@/app/actions/shoppingList"

export default function ShoppingList({ 
  listByIngredient 
}: { 
  listByIngredient: Array<{
    id: number
    ingredientName: string
    quantity: string  // ✅ Plus de null
    unit: string
    isChecked: boolean
  }>
}) {
  if (listByIngredient.length === 0) {
    return (
      <div className="m-4 p-4 text-gray-500 text-center">
        Aucun article
      </div>
    )
  }

  const handleClick = async (id:number) => {
     await deleteFromShoppingList(id)
  }

  return (
    <div className="m-4 space-y-2">
      {listByIngredient.map((item) => (
        <div 
          key={item.id} 
          className={`
            bg-white p-4 rounded-2xl shadow
            ${item.isChecked ? 'opacity-50' : ''}
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-[15px] font-bold ${item.isChecked ? 'line-through' : ''}`}>
                {item.ingredientName}
              </h1>
              <p className="text-xs text-gray-400">
                {Math.round(Number(item.quantity))} {item.unit}
              </p>
            </div>

            {/* bouton pour supprimer un plat */}

              <button className="cursor-pointer" 
              onClick={() => handleClick(item.id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  )
}