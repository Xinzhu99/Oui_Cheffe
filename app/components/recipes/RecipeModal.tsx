"use client";

import { addToRecipes } from "@/app/actions/recipes";
import { redirect } from "next/navigation";
import { useState } from "react";

interface RecipeModalProps {
  recipe: any;
}

export default function RecipeModal({ recipe }: RecipeModalProps) {
  const [showModal, setShowModal] = useState(true);
  const [message, setMessage] = useState("");

  //fonction handleSubmit pour envoyer la data au back

  const handleSubmit = async (formData: FormData) => {
    const result = await addToRecipes(formData);

    setMessage(result.message)

    setTimeout(()=> {
           redirect("/")
         }, 1000)
  };
  
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
            padding: "100px",
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

            {/* ✅✅✅ Partie formulaire */}
            <form
              className="space-y-4 flex flex-col gap-4 "
              action={handleSubmit}
            >
              {/* Input Nom */}
              <div className="flex w-full">
                <label className=" mb-2 text-xl text-orange-400">
                  Nom du plat :{" "}
                </label>
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
                  type="number"
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
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <li
                      key={index}
                      className="bg-white rounded-2xl my-2 p-4 shadow flex justify-around"
                    >
                      <input
                        className="text-orange-400 font-extrabold"
                        type="text"
                        name={`ingredient_name_${index}`}
                        defaultValue={ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1).toLowerCase()}
                      />

                      <input
                        className="text-orange-400 font-extrabold"
                        type="number"
                        step="0.01"
                        name={`ingredient_qqt_${index}`}
                        defaultValue={ingredient.quantity}
                      />

                      <input
                        className="text-orange-400 font-extrabold"
                        type="text"
                        name={`ingredient_unit_${index}`}
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
                  className="bg-white rounded-2xl m-4 p-4 shadow text-black"
                />
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
                  type="submit"
                  className="w-full bg-orange-400 p-2 text-white font-extrabold rounded-2xl cursor-pointer hover:bg-orange-500 transition-colors"
                >
                  Enregistrer
                </button>
              </div>

              {/* partie message */}
              {message && (
                <div
                  className={`m-4 p-4 rounded-2xl text-center font-bold ${
                    message
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
