import { db } from "@/lib/db/drizzle";
import { ingredients, shopping_list, dishes } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function MyList() {
  const data = await db.execute(
    sql`
    SELECT
    dishes.name as dish,
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

GROUP BY dishes.name
    `
  );
  console.log(data.rows)

  return (
    <div>
      <h1>Voici ma liste de courses : </h1>
      {data.rows.map((row, index) => (
        <div key={index}>
          <h1 className="text-3xl text-amber-900">{row.dish}</h1>
          <ul>
            {row.ingredients.map((ingredient)=>
            <li key={ingredient.id}>{ingredient.name} : {ingredient.quantity} {ingredient.unit}</li>
            )}
          </ul>
         
        </div>
      ))}
    </div>
  );
}
