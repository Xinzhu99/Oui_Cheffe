"use client";
import { deleteFromShoppingList } from "@/app/actions/shoppingList";
import { shoppingListItem } from "@/lib/types/shoppingList";

export default function ShoppingList({
  listByIngredient,
}: {
  listByIngredient: shoppingListItem[];
}) {
  
  //fonction pour retirer les ingredients de la shopping list
  const handleClick = async (id:number) => {
    await deleteFromShoppingList(id)
  }
  
  return (
    <div className=" flex flex-col p-4 gap-4">
      {listByIngredient.map((item) => (
        <div
          key={item.shopping_list.id}
          className="dishCard bg-white flex justify-between items-center rounded-2xl p-2 shadow"
        >
          <div className="textWrapper">
            <h1 className="text-[15px] font-bold">
              {item.ingredients.name || null}
            </h1>
            <h1 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {Math.round(item.shopping_list.quantity)} {item.ingredients?.unit}
            </h1>
          </div>

          {/* bouton pour supprimer un plat */}
          <button className="cursor-pointer" 
              onClick={() => handleClick(item.shopping_list.ingredient_id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}
