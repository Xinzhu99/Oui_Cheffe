"use client";
import { useState } from "react";
import { addToMenu } from "../../actions/menu";
import { DishImage } from "../images/DishImage";

export default function RecipeDetails({
  recipe,
}: {
  recipe: {
    dishId: number;
    dishName: string;
    prepTime: number | null;
    image: string | null;
    instructions: string | null;
    ingredients: Array<{
      id: number;
      name: string;
      unit: string;
      quantity: string;
    }>;
  };
}) {
  const defaultServings = 2;
  const [servings, setServings] = useState(defaultServings);
  const [message, setMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  //fonction permettant d'actualiser les quantité d'ingrédients
  const ajustedQty = (defaultQty: number) => {
    return Math.round((defaultQty / defaultServings) * servings);
  };

  //fonction pour gérér le click bouton : appel d'action et recevoir le retour message
  const handleClick = async (servings: number) => {
    const result = await addToMenu(recipe.dishId, servings);
    setMessage(result);
  };

  return (
    <div className=" h-5/10">
      {/* partie image plat */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <DishImage
          dishName={recipe.dishName}
          dbImageUrl={recipe.image}
          className="w-full h-full"
        />
        {/* partie tite et prep time */}

        <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
          <span>⏱️</span>
          <span className="font-semibold text-sm">{recipe.prepTime} min</span>
        </div>
      </div>

      <h1
        className="text-2xl font-bold mx-4 my-2 leading-tight"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          background: "linear-gradient(90deg, #FF6B35 0%, #FF4500 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {recipe.dishName}
      </h1>

      {/* counter */}

      <div
        className="mx-4 my-6 p-5 rounded-2xl bg-white border border-gray-200"
        style={{ boxShadow: "0 4px 16px rgba(255, 107, 53, 0.08)" }}
      >
        <p className="text-sm font-bold text-gray-600 mb-3 uppercase ">
          Nombre de personnes
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setServings(Math.max(1, servings - 1))}
            className="w-12 h-12 bg-white border-2 border-orange-500 rounded-xl text-2xl text-orange-500 font-bold transition-all hover:bg-orange-500 hover:text-white active:scale-95"
          >
            −
          </button>

          <span
            className="text-4xl font-bold text-orange-500"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {servings}
          </span>

          <button
            onClick={() => setServings(servings + 1)}
            className="w-12 h-12 bg-white border-2 border-orange-500 rounded-xl text-2xl text-orange-500 font-bold transition-all hover:bg-orange-500 hover:text-white active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      {/* partie liste ingrédients */}
      <h2
        className="text-xl font-bold mx-4 mt-8 mb-4"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          color: "#FF6B35",
        }}
      >
        📋 Ingrédients
      </h2>
      <div className="flex flex-col">
        {/*partie liste des ingrédients */}
        <ul className="m-4 ">
          {recipe.ingredients.map((ingredient) => (
            <li
              key={ingredient.id}
              className="bg-white rounded-2xl my-2 p-4 border border-gray-200 transition-all hover:-translate-y-0.5"
              style={{ boxShadow: "0 2px 8px rgba(255, 107, 53, 0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="font-semibold text-gray-900 flex-1">
                  {ingredient.name}
                </span>
                <span className=" text-orange-500">
                  {ajustedQty(Number(ingredient.quantity))} {ingredient.unit}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <h1
          className="text-xl font-bold mx-4 mt-8 mb-4"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#FF6B35",
          }}
        >
          👨‍🍳 Préparation
        </h1>

        <div
          className="bg-white rounded-2xl mx-4 p-5 border border-gray-200 mb-10"
          style={{ boxShadow: "0 2px 8px rgba(255, 107, 53, 0.08)" }}
        >
          <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
        </div>

        {/*div bouton */}
        <div
          className="fixed bottom-16 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50"
          style={{ boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.05)" }}
        >
          <button
            disabled={message?.success}
            onClick={() => handleClick(servings)}
            className="w-full px-6 py-4 rounded-2xl font-bold text-white transition-all disabled:opacity-50"
            style={{
              background: message?.success
                ? "#10B981"
                : "linear-gradient(135deg, #FF8C61, #FF6B35)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {message?.success ? "✅ Ajouté au menu" : "Ajouter au menu"}
          </button>

          {/* Message d'erreur si besoin */}
          {message && !message.success && (
            <p className="mt-3 text-center text-sm text-red-600 font-semibold">
              {message.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
