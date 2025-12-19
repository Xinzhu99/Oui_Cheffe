
export type Recipe = {
    dishId: number,
    dishName: string,
    time: number | null,
    dishCat: string | null,
    prepTime: number | null,
    instructions: string | null,
    ingredients: Ingredient [] //tableau d'Ingredient
}

export type Ingredient = {
    id: number,
    name: string,
    unit: string,
    quantity: number
}
