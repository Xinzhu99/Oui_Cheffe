"use client";
import { useState } from "react";
import { addToShoppingList } from "../actions/shoppingList";
import { useActionState } from "react";
import Image from "next/image";
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
    <div className=" h-3/10">
      <div className="picWrapper">
        <Image
          src="/mockup.jpg"
          alt={recipe.dishName}
          width={800}
          height={300}
          className="object-cover"
        />
      </div>

      {/* partie tite et prep time */}
      <div className="flex flex-col p-4 m-4 gap-4 border-b-2 border-gray-300">
        <h1 className="text-3xl text-orange-400">{recipe.dishName}</h1>
        <p> ⏱️ {recipe.prepTime} minutes</p>
      </div>

      {/* counter */}
      <div className="counter flex flex-col p-4 m-4 gap-4 items-left bg-orange-400 rounded-2xl">
        <span className="text-white font-extrabold">NOMBRE DE SERVICES</span>
        <div className="rowWrapper flex gap-4 justify-between">
          <button
            onClick={() => setServings(Math.max(1, servings - 1))}
            className="w-[48px] h-[48px] bg-white rounded-2xl text-4xl text-orange-400 cursor-pointer "
            type="button"
          >
            −
          </button>
          <input
            name="services"
            className="counter text-2xl w-4 text-white"
            type="text"
            value={servings}
            readOnly
          />
          <button
            onClick={() => setServings(servings + 1)}
            className="w-[48px] h-[48px] bg-white rounded-2xl text-4xl text-orange-400 cursor-pointer "
            type="button"
          >
            +
          </button>
          <input name="dishId" value={recipe.dishId} type="hidden" readOnly />
        </div>
      </div>

      {/* partie liste ingrédients */}
      <div></div>
      <h1 className="text-2xl text-orange-400 m-4 mt-8">📋 Ingrédients</h1>

      <form action={formAction}
      className="flex flex-col">
        {/*partie liste des ingrédients */}
        <ul className="m-4 ">
          {recipe.ingredients.map((ingredient: any) => (
            <li
              key={ingredient.id}
              className="bg-white rounded-2xl my-2 p-4 shadow flex"
            >
              <span className="text-orange-400 font-extrabold">
                {ingredient.name}{" "}
              </span>
              <span className="ml-auto">
                {ajustedQty(ingredient.quantity)} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>

        <h1 className="text-2xl text-orange-400 m-4 mt-8">👨‍🍳 Préparation</h1>
        <div className="bg-white rounded-2xl m-4 p-4 shadow ">
          <p >
            {recipe.instructions}
          </p>
        </div>

        <button 
        type="submit" 
        className="bg-orange-400 p-2 m-4 text-white font-extrabold rounded-2xl sticky bottom-2">
          Ajouter à ma liste
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
}
