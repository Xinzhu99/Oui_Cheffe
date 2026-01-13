"use client"

import { deleteFromMenu } from "@/app/actions/menu";
import { DishesByDate } from "@/lib/types/menu";
import Link from "next/link";

export default function MenuContent({menu} : {menu: DishesByDate []}) {
//fonction pour gérer la suppression d'un plat du menu :
  const handleClick = async (id:number) => {
      await deleteFromMenu(id)
      
  }
  if (menu.length === 0) {
    return(
      <div className="m-4 p-4">Vous n'avez pas encore ajouté de plat.</div>
    )
  }
  return (
    <div className="dishList flex flex-col">
      {menu.map((group, index) => (
        <div key={index} className=" flex flex-col p-4 gap-4">
          <h1 className=" text-[22px] font-bold leading-tight text-orange-400">
            📅 {group.date}
          </h1>

          {group.dish.map((dish) => (
            <Link
              key={dish.id}
              href={`/dish/${dish.id}`}
              className="dishCard bg-white flex justify-between items-center rounded-2xl p-2 shadow"
            >
              <div className="picWrapper rounded-2xl bg-orange-400 w-[64px] h-[64px] flex justify-center items-center shadow">
                🥞
              </div>
              <div className="textWrapper">
                <h1 className="text-[15px] font-bold">{dish.name}</h1>
                <h1 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {dish.servings} personnes
                </h1>
              </div>

              {/* bouton pour supprimer un plat */}

              <button className="cursor-pointer" 
              onClick={() => handleClick(dish.id)}
              >🗑️</button>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
