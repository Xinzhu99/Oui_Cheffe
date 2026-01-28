"use client";

import { deleteFromMenu } from "@/app/actions/menu";
import { DishesByDate } from "@/lib/types/menu";
import Link from "next/link";
import { useState } from "react";
import { DishImage } from "../images/DishImage";

export default function MenuContent({ menu }: { menu: DishesByDate[] }) {
  const [message, setMessage] = useState("");
  //fonction pour gérer la suppression d'un plat du menu :
  const handleClick = async (id: number) => {
    const result = await deleteFromMenu(id);
    if (result) {
      setMessage(result.message);
    }
  };

  {
    /*partie quand aucun dish dans le menu */
  }
  if (menu.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-5">
        <div className="text-6xl mb-4 opacity-30">📅</div>
        <h3
          className="text-xl font-bold mb-2 text-gray-600"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Ton menu est vide
        </h3>
        <p className="text-sm text-gray-600 opacity-80 mb-6">
          Ajoute des recettes pour créer ton menu de la semaine !
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-2xl font-bold text-white transition-all "
          style={{
            background: "linear-gradient(135deg, #FF8C61, #FF6B35)",
            boxShadow: "0 8px 24px rgba(255, 107, 53, 0.15)",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Découvrir les recettes
        </Link>
      </div>
    );
  }

  return (
    <div className="dishList flex flex-col">
      {menu.map((group, index) => (
        <div key={index} className=" flex flex-col p-4 gap-4">
          <h2
            className="text-xl font-bold mb-2"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              color: "#FF6B35",
            }}
          >
            📅 {group.date}
          </h2>

          {group.dish.map((dish) => (
            <div
              key={dish.id}
              className="dishCard bg-white flex justify-between items-center rounded-2xl p-4 gap-4 border border-gray-200 transition-all hover:-translate-y-0.5"
              style={{
                boxShadow: "0 4px 16px rgba(255, 107, 53, 0.08)",
                animation: `fadeInUp 0.4s ease-out backwards`,
              }}
            >
              <Link
                href={`/dish/${dish.id}`}
                className="flex gap-4 items-center flex-1"
              >
                <div className="picWrapper rounded-2xl">
                  <DishImage dishName={dish.name} dbImageUrl={dish.image} />
                </div>

                <div className="textWrapper">
                  <h3
                    className="text-base font-bold text-gray-900 mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {dish.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {dish.servings}{" "}
                    {dish.servings > 1 ? "personnes" : "personne"}
                  </p>
                </div>
              </Link>

              {/* Bouton supprimer plus visible */}
              <button
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all active:scale-95 "
                onClick={() => handleClick(dish.id)}
                title="Supprimer du menu"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      ))}

      {/* partie message */}
      {message && (
        <div
          className="mx-4 mb-10 p-4 bg-red-50 rounded-2xl border-2 border-red-200"
        >
          <div className="flex items-start gap-3">
            <div>
              <strong
                className="block text-red-900 mb-1"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Attention
              </strong>
              <p className="text-sm text-red-700">{message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
