import { db } from "@/lib/db/drizzle";
import { sql } from "drizzle-orm";


export default async function getDishes (params:type) {
    try {
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
            `)
    } catch (error) {
        console.error("Problem of get dishes data", error)
    }
    
}