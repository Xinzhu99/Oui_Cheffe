export  type DishesByDate = {
    date: string,
    dish: Dish []
}

export type Dish = {
    name: string,
    id: number, 
    servings : number, 
}

export type IngredientOfList = {
    menuId: number;
    servings: number;
    dishId: number;
    dishName: string | null;
    ingredientsId: number | null;
    quantity: string | null;
    ingredientsName: string | null;
    ingredientsUnit: string | null;
}