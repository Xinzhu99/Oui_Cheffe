"use server"
import { db } from "@/lib/db/drizzle";
import { shopping_list } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

//function qui permet d'ajouter des ingrédients d'une recette au back table shopping_list
export async function addToShoppingList(
  ingredientsData: { id: number; quantity: number }[],
  dishId: number
) {
    try {
        //insérer les ingrédients :
        for (const ingredient of ingredientsData) {
            await db.insert(shopping_list).values({
                ingredient_id: ingredient.id,
                quantity:ingredient.quantity,
                dish_id:dishId
            })
        }
        revalidatePath("/my-list")
    } catch (error) {
        console.error("Erreur", error)
    }
}

//function qui permet de récupérer le data dans ma table shooping_list
export async function getShoppingList(params:type) {
    try {
        const listData = await db.select(shopping_list)
        console.log(listData)
    } catch (error) {
        console.error("Erreur", error)
    }
}

