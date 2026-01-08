export type shoppingListItem = {
    shopping_list: {
        id: number;
        ingredient_id: number;
        quantity: string;
        source: "recipe" | "manual";
        is_checked: boolean;
        created_at: Date | null;
        updated_at: Date | null;
    };
    ingredients: {
        id: number;
        name: string | null;
        unit: string;
        ingredient_category_id: number | null;
        created_at: Date | null;
    } | null;
}