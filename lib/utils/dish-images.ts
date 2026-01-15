//mapping les nom des plats avec les les chiminsavec le type Record 
const DISH_IMAGES: Record<string, string> = {
  "Pâtes Carbonara": "/images/dishes/carbonara.jpg",
  "Poulet rôti aux herbes": "/images/dishes/poulet-roti.jpg",
  "Omelette aux champignons": "/images/dishes/omelette-mushroom.jpg",
  "Risotto aux champignons": "/images/dishes/risotto-champi.jpg",
  "Salade César au poulet": "/images/dishes/salade-poulet.jpg",
  "Gratin dauphinois": "/images/dishes/gratin-dauphinois.jpg",
  "Quiche Lorraine": "/images/dishes/quiche-lorraine.jpg",
  "Saumon grillé au citron": "/images/dishes/saumon.jpg",
  "Ratatouille provençale": "/images/dishes/ratatouille.jpg",
  "Crêpes sucrées": "/images/dishes/crepe-sucree.jpeg",
}

const DEFAULT_IMAGE = "/images/dishes/default.jpg"
//function qui permet de récupérer url de l'image
//priorité : url BDD > mapping local > default

export function getDishImageUrl(dishName: string, dbImageUrl?:string | null):string {
      // Si l'image est dans la BDD (pour les recettes user futures)
    if (dbImageUrl) {
        return dbImageUrl
    }
    //sinon cherche dans le mapping 
    const localImage = DISH_IMAGES[dishName]

    if(!localImage) {
        console.warn(`⚠️ Aucune image trouvée pour "${dishName}"`)
        return DEFAULT_IMAGE
    }
    return localImage
}

export function hasDishImage (dishName: string): boolean {
    return dishName in DISH_IMAGES
}