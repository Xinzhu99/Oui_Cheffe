import { db } from "@/lib/db/drizzle";
import { ingredients, shopping_list, dishes } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import MergeIngredientsLists from "../components/MergeIngredientsLists";

export default async function MyList() {
  const data = await db.execute(
    sql`
    SELECT
    dishes.name as dish,
    shopping_list.services as services,
  json_AGG(
  json_build_object(
  'id',ingredients.id,
  'unit',ingredients.unit,
  'name',ingredients.name,
  'quantity',dish_ingredients.quantity
  )
  ) AS ingredients
FROM shopping_list
LEFT JOIN dishes ON dishes.id = shopping_list.dish_id
  LEFT JOIN dish_ingredients ON dish_ingredients.dish_id =  dishes.id
LEFT JOIN ingredients ON ingredients.id = dish_ingredients.ingredient_id

GROUP BY dishes.name, services
    `
  );
  // console.log(data.rows);

  const defaultServings = 2;
  return (
    <>
      
      <div>
        <MergeIngredientsLists listsData={data.rows} />
      </div>
    </>
  );
}
