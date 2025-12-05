"use server"
import { db } from "@/lib/db/drizzle";
import {  shopping_list, dishes, ingredients,dish_ingredients } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

//function qui permet d'ajouter des ingrédients d'une recette au back table shopping_list
export async function addToShoppingList(prevState, formData: FormData) {
    const dishId = formData.get("dishId")
    console.log("dishId",dishId)
    const services = formData.get("services")
    console.log("services", services)

    try {
        const id = await db.select({
            id: shopping_list.dish_id
    })
        .from(shopping_list)
        .where(eq(shopping_list.dish_id, dishId))
console.log("id",id)
        if(id.length !== 0) {
            return "Vous avez déjà ajouté ce plat"
        } else {
            await db.insert(shopping_list).values({
                services: services,
                dish_id:dishId,

            }).returning()
        
        revalidatePath("/my-list")
        return "Les ingrédients ont été ajoutés !"
        }
    } catch (error) {
        console.error("Having problem of API", error)
        return "API erreur"
    }

}

//function qui permet de récupérer le data dans ma table shooping_list
// export async function getShoppingList(params:type) {
//     try {
//         const data = await db
//             .select({
//               dishId: dishes.id,
//               dishName: dishes.name,
        
//               // Informations des ingrédients
//               ingredientId: ingredients.id,
//               ingredientName: ingredients.name,
//               ingredientUnit: ingredients.unit,
//               quantity: dish_ingredients.quantity,
//             })
//             .from(shopping_list)
//             .innerJoin(dishes, eq(dishes.id, shopping_list.dish_id))
//             .innerJoin(dish_ingredients, eq(dish_ingredients.dish_id, dishes.id))
//             .innerJoin(ingredients, eq(ingredients.id, dish_ingredients.ingredient_id))

//             console.log(data)
//     } catch (error) {
//         console.error("Erreur", error)
//     }
// }

