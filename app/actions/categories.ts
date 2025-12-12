"use server"
import { db } from "@/lib/db/drizzle";
import { dish_categories } from "@/lib/db/schema";

export default async function getCategories() {
    try {
        const data = await db.select().from(dish_categories)
        return data
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error)
        return []
    }
}