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
  if (menu.length === 0) {
    return (
      <div className="m-4 p-4">Vous n'avez pas encore ajouté de plat.</div>
    );
  }
  return (
    <div className="dishList flex flex-col">
      {menu.map((group, index) => (
        <div key={index} className=" flex flex-col p-4 gap-4">
          <h1 className=" text-[22px] font-bold leading-tight text-orange-400">
            📅 {group.date}
          </h1>

          {group.dish.map((dish) => (
            <div className="dishCard bg-white flex justify-between items-center rounded-2xl p-4 shadow gap-4">
              <Link
                key={dish.id}
                href={`/dish/${dish.id}`}
                className="flex gap-4 items-center flex-1" // ← Changements ici
              >
                <div className="picWrapper rounded-2xl flex-shrink-0">
                  <DishImage dishName={dish.name} dbImageUrl={dish.image} />
                </div>
                <div className="textWrapper">
                  <h1 className="text-[15px] font-bold">{dish.name}</h1>
                  <h1 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {dish.servings} personnes
                  </h1>
                </div>
              </Link>

              {/* Bouton supprimer avec meilleur styling */}
              <button
                className="cursor-pointer hover:bg-red-50 p-2 rounded-lg transition-colors flex-shrink-0"
                onClick={() => handleClick(dish.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      ))}

      {/* partie message */}
      {message && (
        <div className="m-4 p-4 rounded-2xl text-center font-bold bg-red-100 text-red-800">
          {message}
        </div>
      )}
    </div>
  );
}
