"use client";
import { useState } from "react";
import { addToShoppingList } from "../actions/shoppingList";
import { useActionState } from "react";

export default function DishDetailsClient({ recipe }) {
  const defaultServings = 2;
  const [servings, setServings] = useState(defaultServings);

  //fonction permettant d'actualiser les quantité d'ingrédients
  const ajustedQty = (defaultQty: number) => {
    return Math.round((defaultQty / defaultServings) * servings);
  };
  //déclarer useActionState
  const [message, formAction] = useActionState(addToShoppingList, null);

  return (
    <div className="recipeCard">
      <h1 className="text-2xl">{recipe.dishName}</h1>
      <p>Temps de préparation : {recipe.prepTime} minutes</p>

      <h1 className="text-xl">Ingrédients : </h1>

      {/*partie liste des ingrédients */}
      <form action={formAction}>
        <ul>
          {recipe.ingredients.map((ingredient: any) => (
            <li key={ingredient.id}>
              {ingredient.name} : {ajustedQty(ingredient.quantity)} {ingredient.unit}
            </li>
          ))}
        </ul>

       

        <h1 className="text-xl">Etapes : </h1>
        <p>{recipe.instructions}</p>

        {/* counter */}
        <div className="counter flex gap-2 items-center my-4">
          <span>Nombre de services :</span>
          <button
            onClick={() => setServings(Math.max(1, servings - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
            type="button"
          >
            -
          </button>
          <input
          name="services"
            className="counter bg-amber-50 w-4"
            type="text"
            value={servings}
            readOnly
          />
          <button
            onClick={() => setServings(servings + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
            type="button"
          >
            +
          </button>
           <input name="dishId" 
        value={recipe.dishId} type="hidden" readOnly
        />
        </div>

        <button type="submit" className="bg-amber-200 p-2 rounded-2xl">
          Ajouter à ma liste
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
}
