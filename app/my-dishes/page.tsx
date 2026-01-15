import { db } from "@/lib/db/drizzle";
import { sql } from "drizzle-orm";
import MenuContent from "../components/menu/MenuContent";
import HeaderWrapper from "../components/HeaderWrapper";
import CreateList from "../components/menu/CreateList";
import { DishesByDate } from "@/lib/types/menu";

export default async function MyDishes() {
  const menuData = await db.execute(sql`
    SELECT 
      DATE(menu.created_at) as date,
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'name', dishes.name,
          'id',dishes.id,
          'servings', menu.servings,
          'image',dishes.Image_url
        ) 
      ) as dish
    FROM menu
    LEFT JOIN dishes ON dishes.id = menu.dish_id
    GROUP BY DATE(menu.created_at)
    `);
  const menuArr = menuData.rows as DishesByDate[] //           ↑ "TypeScript, fais-moi confiance, c'est ce type !"
  console.log("😁", menuArr);

  return (
    <div className="flex flex-col ">
      <HeaderWrapper header="Mon menu" text="Vos plats à cuisiner" />

      <MenuContent menu={menuArr} />
      {menuArr.length >0 &&<CreateList />}
    </div>
  );
}
