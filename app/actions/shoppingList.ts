"use server";
import { db } from "@/lib/db/drizzle";
import { menu } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

//function qui permet d'ajouter des ingrédients d'une recette au back table menu
export async function addToShoppingList(dishId, servings) {
  console.log("🎅", dishId);
  console.log("😁", servings);

  try {
    const id = await db
      .select()
      .from(menu)
      .where(eq(menu.dish_id, parseInt(dishId)));

    if (id.length !== 0) {
      return {
        success: false,
        message: "Vous avez déjà ajouté ce plat",
      };
    } else {
      await db
        .insert(menu)
        .values({
          servings: servings,
          dish_id: dishId,
        })
        .returning();

      revalidatePath("/my-dishes");
      return {
        success: true,
        message: "Le plat a été ajouté !",
      };
    }
  } catch (error) {
    console.error("Having problem of API", error);
    return {
      success: false,
      message: "API erreur",
    };
  }
}
