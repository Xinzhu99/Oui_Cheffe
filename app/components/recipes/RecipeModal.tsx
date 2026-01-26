"use client";

import { useState } from "react";

interface RecipeModalProps {
  recipe: any;
}

export default function RecipeModal({ recipe }: RecipeModalProps) {
  const [showModal, setShowModal] = useState(true);

  return (
     <>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            padding: "24px",
            overflowY: "auto",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4/5 p-4 transform transition-all relative overflow-y-auto justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Titre */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Recette générée✨!
            </h2>

            <form className="space-y-4 flex flex-col gap-4 ">
              {/* Input Nom */}
              <div className="flex w-full">
                <label className="block mb-2">Nom du plat : </label>
                <input
                  name="name"
                  defaultValue={recipe.dish.name}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>

              {/* Input durée */}
              <div className="flex w-full">
                <label className="block mb-2">Préparation : </label>
                <input
                  name="prep-time"
                  defaultValue={recipe.dish.prep_time}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>

              {/* Input dish_cat */}
              <div className="flex w-full">
                <label className="block mb-2">Type de plat : </label>
                <input
                  name="category"
                  defaultValue={recipe.dish.category}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>

              {/* partie liste ingrédients */}
              <h1 className="text-2xl text-orange-400 m-4 mt-8">
                📋 Ingrédients
              </h1>

              <div className="flex flex-col w-4/5">
                {/*partie liste des ingrédients */}
                <ul className="m-4">
                  {recipe.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="bg-white rounded-2xl my-2 p-4 shadow flex justify-around"
                    >
                      <input className="text-orange-400 font-extrabold"
                      key={ingredient.id}
                      type="text"
                      name="ingredient_name"
                      defaultValue={ingredient.name}
                      />
                        
                      <input className="text-orange-400 font-extrabold"
                      type="text"
                      name="ingredient_qqt"
                      key={ingredient.id}

                      defaultValue={ingredient.quantity}
                      />
                      
                      <input className="text-orange-400 font-extrabold"
                      type="text"
                      name="ingredient_unit"
                      key={ingredient.id}
                      defaultValue={ingredient.unit}
                      />
                                            
                    </li>
                  ))}
                </ul>

              

                <h1 className="text-2xl text-orange-400 m-4 mt-8">
                  👨‍🍳 Préparation
                </h1>

                <textarea
                defaultValue={recipe.dish.instructions}
                name="instructions"
                rows={10}
                className="bg-white rounded-2xl m-4 p-4 shadow text-black"/>

                <p>{recipe.name}</p>
              </div>

              {/* partie BOUTONS */}
              <div className="flex flex-col gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-2 text-white font-extrabold rounded-2xl w-full
        transition-all bg-red-500 hover:bg-red-600"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  className="w-full bg-orange-400 p-2 text-white font-extrabold rounded-2xl cursor-pointer hover:bg-orange-500 transition-colors"
                >
                  Enregistrer
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
