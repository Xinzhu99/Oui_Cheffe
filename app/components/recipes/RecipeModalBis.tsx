"use client";

import { useState } from "react";

export default function RecipeModalBis() {
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px",
            overflowY: "auto",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 transform transition-all relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Titre */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Recette générée✨!
            </h2>

            {/* <button
              onClick={() => setShowModal(false)}
              type="button"
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full text-xl font-bold text-gray-600 flex items-center justify-center transition-colors"
            >
              ✕
            </button> */}

            <form className="space-y-4 flex flex-col gap-4 p-4">
              {/* Input Nom */}
              <div className="flex w-full">
                <label className="block mb-2">Nom du plat :</label>
                <input
                  name="name"
                  placeholder="Ratatouille"
                  //   value={recipe.name}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>

              {/* Input durée */}
              <div className="flex w-full">
                <label className="block mb-2">Préparation :</label>
                <input
                  name="prep-time"
                  placeholder="60 min"
                  //   value={recipe.name}
                  required
                  className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400 transition-all"
                />
              </div>

              {/* partie liste ingrédients */}
              <h1 className="text-2xl text-orange-400 m-4 mt-8">
                📋 Ingrédients
              </h1>

              <div className="flex flex-col">
                {/*partie liste des ingrédients */}
                {/* <ul className="m-4 ">
                  {recipe.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="bg-white rounded-2xl my-2 p-4 shadow flex"
                    >
                      <span className="text-orange-400 font-extrabold">
                        {ingredient.name}{" "}
                      </span>
                      <span className="ml-auto">
                        {ajustedQty(Number(ingredient.quantity))}{" "}
                        {ingredient.unit}
                      </span>
                    </li>
                  ))}
                </ul> */}

                {/* exemple avec la fausse data */}
                <li className="bg-white rounded-2xl my-2 p-4 shadow flex">
                  <span className="text-orange-400 font-extrabold">Ail</span>
                  <span className="ml-auto">2 gousses</span>
                </li>

                <li className="bg-white rounded-2xl my-2 p-4 shadow flex">
                  <span className="text-orange-400 font-extrabold">
                    Tomates
                  </span>
                  <span className="ml-auto">2 pièces</span>
                </li>

                <h1 className="text-2xl text-orange-400 m-4 mt-8">
                  👨‍🍳 Préparation
                </h1>
                <div className="bg-white rounded-2xl m-4 p-4 shadow ">
                  {/* <p>{recipe.instructions}</p> */}
                </div>
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
