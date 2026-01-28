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

    setMessage(result.message);

    setTimeout(() => {
      redirect("/");
    }, 1000);
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
            overflowY: "auto",
            padding: "20px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ✅✅✅ Partie formulaire */}
            <form action={handleSubmit} className="p-6 space-y-6">
              {/* Titre */}
              <h2
                className="text-2xl font-bold m-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Recette générée✨!
              </h2>
              {/* Section Informations générales */}
              <div>
                <h3
                  className="text-lg font-bold mb-4 text-orange-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  📝 Informations du plat
                </h3>

                <div>
                  {/* Nom du plat */}
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Nom du plat
                    </label>
                    <input
                      name="name"
                      type="text"
                      defaultValue={recipe.dish.name}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 transition-all focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  {/* Temps de préparation */}
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Temps de préparation (min)
                    </label>
                    <input
                      name="prep-time"
                      type="number"
                      defaultValue={recipe.dish.prep_time}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 transition-all focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  {/* Catégorie */}
                  <div>
                    <label
                      className="block text-sm font-semibold text-gray-700 mb-2"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Type de plat
                    </label>
                    <input
                      name="category"
                      type="text"
                      defaultValue={recipe.dish.category}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 transition-all focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>
              </div>

              {/* Section Ingrédients */}
              <div
                
              >
                <h3
                  className="text-lg font-bold mb-4 text-orange-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  📋 Ingrédients
                </h3>

                <div className="space-y-2">
                  {recipe.ingredients.map((ingredient: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-3"
                    >
                      {/* Nom */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Ingrédient
                        </label>
                        <input
                          type="text"
                          name={`ingredient_name_${index}`}
                          defaultValue={
                            ingredient.name.charAt(0).toUpperCase() +
                            ingredient.name.slice(1).toLowerCase()
                          }
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-100"
                        />
                      </div>

                      {/* Quantité */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Quantité
                        </label>
                        <input
                          type="number"
                          name={`ingredient_qqt_${index}`}
                          defaultValue={ingredient.quantity}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-100"
                        />
                      </div>

                      {/* Unité */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Unité
                        </label>
                        <input
                          type="text"
                          name={`ingredient_unit_${index}`}
                          defaultValue={ingredient.unit}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Instructions */}
              <div
                
              >
                <h3
                  className="text-lg font-bold mb-4 text-orange-500"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  👨‍🍳 Préparation
                </h3>

                <textarea
                  name="instructions"
                  defaultValue={recipe.dish.instructions}
                  rows={8}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 leading-relaxed transition-all focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Message de feedback */}
              {message && (
                <div
                  className={`p-4 rounded-2xl border-2 ${
                    message.includes("✅")
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                  style={{ animation: "fadeIn 0.4s ease-out" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {message.includes("✅") ? "✅" : "❌"}
                    </span>
                    <p
                      className={`text-sm font-semibold ${
                        message.includes("✅")
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {message}
                    </p>
                  </div>
                </div>
              )}

              {/* Boutons d'action */}
             <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 rounded-b-2xl flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white border-2 border-red-500 text-red-500 p-3 font-bold rounded-2xl hover:bg-red-50 transition-all active:scale-95 disabled:opacity-50"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Annuler
              </button>

              <button
                type="submit"
                className="flex-1 text-white p-3 font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50"
                style={{
                  background: '#D1D5DB linear-gradient(135deg, #FF8C61, #FF6B35)',
                  fontFamily: "'Montserrat', sans-serif",
                }}
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
