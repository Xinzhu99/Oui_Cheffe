import { db } from "@/lib/db/drizzle";
import { eq, sql } from "drizzle-orm";
import MenuContent from "../components/menu/MenuContent";
import HeaderWrapper from "../components/HeaderWrapper";

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
  // console.log("😁", menuArr);

  return (
    <div className="flex flex-col ">
      <HeaderWrapper header="Mon menu" text="Vos plats à cuisiner" />

      <MenuContent menu={menuArr} />
      <button
        type="submit"
        className="bg-orange-400 p-2 m-4 text-white font-extrabold rounded-2xl sticky bottom-2 cursor-pointer"
      >
        Créer ma liste
      </button>
    </div>
  );
}
