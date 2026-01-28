"use server";
import { db } from "@/lib/db/drizzle";
import { menu } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

//function qui permet d'ajouter des ingrédients d'une recette au back table menu
export async function addToMenu(dishId: number, servings: number) {
  try {
    // ==========================================
    // ÉTAPE 1 : Récupérer l'état actuel du menu
    // ==========================================
    const menuItems = await db
      .select()
      .from(menu)

    // ==========================================
    // ÉTAPE 2 : Vérifier si le menu est bloqué
    // ==========================================
    // Si au moins un item est "locked", on bloque
    const isLocked = menuItems.some(item => item.status === "locked")
    
    if (isLocked) {
      return {
        success: false,
        message: "🔒 Liste déjà créé. Pour modifier le menu, abandonne la liste actuelle"
      }
    }

    // ==========================================
    // ÉTAPE 3 : Vérifier si le plat existe déjà
    // ==========================================
    const dishExists = menuItems.some(item => item.dish_id === dishId)
    
    if (dishExists) {
      return {
        success: false,
        message: "❌ Tu as déjà ajouté ce plat"
      }
    }

    // ==========================================
    // ÉTAPE 4 : Tout est OK → Insérer le plat
    // ==========================================
    await db
      .insert(menu)
      .values({
        servings: servings,
        dish_id: dishId,
        status: "active" // ← Explicit, c'est mieux !
      })

    revalidatePath("/my-dishes")

    return {
      success: true,
      message: "✅ Le plat a été ajouté à ton menu !"
    }

  } catch (error) {
    console.error("❌ Erreur addToMenu:", error)
    return {
      success: false,
      message: "Erreur lors de l'ajout au menu"
    }
  }
}

//function qui permet de retirer un plat du menu
export async function deleteFromMenu(dishId: number) {
  try {
    const dish = await db.select().from(menu).where(eq(menu.dish_id, dishId));

    console.log("😁", dish);
    if (dish.length === 0) {
      return {
        sucess: false,
        message: "Le plat choisi n'existe pas dans ton menu",
      };
    }
    if(dish[0].status == "locked"){
      return {
        success: false,
        message:"🔒 Liste déjà créé. Pour modifier le menu, abandonne la liste actuelle"
      }
    }

    await db.delete(menu).where(eq(menu.dish_id, dishId));
    revalidatePath("/my-dishes");

    // return {
    //   success: true,
    //   message: "Le plat a été retiré !",
    // };
  } catch (error) {
    console.error("Having problem of API", error);
    return {
      sucess: false,
      message: "API erreur",
    };
  }
}
