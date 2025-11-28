"use server"
import { db } from "@/lib/db/drizzle";
import { ingredients, shopping_list } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

//function qui permet d'ajouter des ingrédients d'une recette au back table shopping_list
export async function addToShoppingList(prevState, formData: FormData) {
    const Postdata = JSON.parse(formData.get("ingredients"))
    console.log("postData",Postdata)

    try {
        for(const ing of Postdata) {
            await db.insert(shopping_list).values({
                ingredient_id: ing.id,
                dish_id:ing.dishId,
                quantity:ing.quantity
            }).returning()
        }
        revalidatePath("/my-list")
        return "Les ingrédients ont été ajoutés !"
    } catch (error) {
        console.error("Having problem of API", error)
        return "API erreur"
    }












    // try {
    //     //insérer les ingrédients :
    //     for (const ingredient of ingredientsData) {
    //         await db.insert(shopping_list).values({
    //             ingredient_id: ingredient.id,
    //             quantity:ingredient.quantity,
    //             dish_id:dishId
    //         })
    //     }
    //     revalidatePath("/my-list")
    // } catch (error) {
    //     console.error("Erreur", error)
    // }
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

