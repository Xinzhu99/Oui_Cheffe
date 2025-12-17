import { db } from "@/lib/db/drizzle";
import { eq, sql } from "drizzle-orm";
import Image from "next/image";

export default async function MyDishes() {
  const menuData = await db.execute(sql`
    SELECT 
      DATE(menu.created_at) as date,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'name', dishes.name,
          'id',dishes.id,
          'servings', menu.servings
        ) 
      ) as dish
    FROM menu
    LEFT JOIN dishes ON dishes.id = menu.dish_id
    GROUP BY DATE(menu.created_at)
    `);
  const menuArr = menuData.rows;
  console.log("😁", menuArr);
  return (
    <div className="flex flex-col ">
      <div className="headerWrapper flex flex-col gap-4 p-4">
        <h1 className="font-bold text-3xl">Mon Menu </h1>
        <p className="font-light text-sm">Vos plats à cuisiner </p>
      </div>

      <div className="dishList">
        {menuArr.map((group, index) => (
          <div key={index} className=" flex flex-col p-4 gap-4">
            <h1 className=" text-[22px] font-bold leading-tight text-orange-400">
              📅 {group.date}
            </h1>

            {group.dish.map((dish) => (
              <div
                key={dish.id}
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
                <button>🗑️</button>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-orange-400 p-2 m-4 text-white font-extrabold rounded-2xl sticky bottom-2 cursor-pointer"
        >
          Continuer
        </button>
      </div>
    </div>
  );
}
