"use client";
import { useState } from "react";
import { addToShoppingList } from "../actions/shoppingList";

export default function DishDetailsClient({ recipe }) {
  const defaultServings = 2;
  const [servings, setServings] = useState(defaultServings);
  const [loading, setLoading] = useState(false)

  //fonction permettant d'actualiser les quantité d'ingrédients
  const ajustedQty = (defaultQty: number) => {
    return Math.round((defaultQty / defaultServings) * servings);
  };
  //function handleSubmit:
  //utiliser onSubmit me permet d'avoir accès aux states servings, state du côté client 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const ajustedIngredients = recipe.ingredients.map((ingredient: any)=>({
      id: ingredient.id,
      quantity: ajustedQty(ingredient.quantity),
    }))
    //appler l'action 
    await addToShoppingList(ajustedIngredients,recipe.dishId)
    console.log("id",recipe.dishId)
  }
  return (
    <div>
      <h1 className="text-2xl">{recipe.dishName}</h1>
      <p>Temps de préparation : {recipe.time} minutes</p>

      <h1 className="text-xl">Ingrédients : </h1>

      {/*partie liste des ingrédients */}
      <ul>
        {recipe.ingredients.map((ingredient: any) => (
          <li key={ingredient.id}>
            {ingredient.name} : {ajustedQty(ingredient.quantity)}{" "}
            {ingredient.unit}
          </li>
        ))}
      </ul>

      <h1 className="text-xl">Etapes : </h1>
      <p>{recipe.instruction}</p>

      {/* counter */}
      <div className="counter flex gap-2 items-center my-4">
        <span>Nombre de services :</span>
        <button
          onClick={() => setServings(Math.max(1, servings - 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <input
          className="counter bg-amber-50 w-4"
          type="text"
          value={servings}
          readOnly
        />
        <button
          onClick={() => setServings(servings + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      {/*button simpe pour ajouter des ingrédients */}
      <form onSubmit={handleSubmit}>
        <button type="submit" className="bg-amber-200 p-2 rounded-2xl">
          {loading ? "Loading" : "Ajouter à ma liste"}
        </button>
      </form>
    </div>
  );
}
