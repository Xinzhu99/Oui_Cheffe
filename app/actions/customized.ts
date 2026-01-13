"use server";

import { db } from "@/lib/db/drizzle";
import { customized_items } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ==========================================
export async function addToCustomized(
  item: string
): Promise<{ success: boolean; message: string }> {
  try {
    const trimmedItem = item.trim();

    if (trimmedItem === "") {
      return {
        success: false,
        message: "L'article ne peut pas être vide.",
      };
    }

    // Formate le nom
    const formattedName =
      trimmedItem.charAt(0).toUpperCase() + trimmedItem.slice(1).toLowerCase();

    // Vérifie si déjà dans la liste
    const alreadyInList = await db
      .select()
      .from(customized_items)
      .where(eq(customized_items.name, formattedName));

    if (alreadyInList.length > 0) {
      return {
        success: false,
        message: "Cet article est déjà dans votre liste.",
      };
    }

    // ✅ Ajoute avec quantity
    await db.insert(customized_items).values({
      name: formattedName,
      is_checked: false,
    });

    revalidatePath("/my-list");

    return {
      success: true,
      message: "✅ Article ajouté à votre liste !",
    };
  } catch (error) {
    console.error("❌ Erreur API:", error);
    return {
      success: false,
      message: "Erreur lors de l'ajout dans la liste",
    };
  }
}

//supprimer des articles de la table
export async function deleteFromCustomized(id: number) {
  try {
    const existigItems = await db.select().from(customized_items);
    if (existigItems.length === 0) {
      return {
        success: false,
        message: "Artcile introuvable",
      };
    }

    await db.delete(customized_items).where(eq(customized_items.id, id));

    revalidatePath("/list");

    return {
      success: true,
      message: "L'article a été retiré",
    };
  } catch (error) {
    console.error("Having problem of API", error);
    return {
      sucess: false,
      message: "API erreur",
    };
  }
}

// ==========================================
// vérifier si un article est checked 
// ==========================================
export async function checkStatus(id:number) {
  const status = await db.select({
    status:customized_items.is_checked
  }).from(customized_items)
  .where(eq(customized_items.id, id))
  .limit(1)

  return status
}
// ==========================================
// checker un article dans la liste
// ==========================================
export async function addToChecked(id:number) {
  try {
    await db.update(customized_items).set({is_checked:true}).where(eq(customized_items.id,id))

    revalidatePath("/my-list/final")
  } catch (error) {
    console.error("Erreur lors de modification de l'article",error)
  }
  
}
// ==========================================
// déchecker un article dans la liste
// ==========================================
export async function removeFromChecked(id:number) {
  try {
    await db.update(customized_items).set({is_checked:false}).where(eq(customized_items.id,id))

    revalidatePath("/my-list/final")
  } catch (error) {
    console.error("Erreur lors de modification de l'article",error)
  }
  
}