"use client"

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
          </div>
        </div>
      ))}
    </div>
  )
}