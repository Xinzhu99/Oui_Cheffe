import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// CATÉGORIES

export const dish_categories = pgTable("dish_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export const ingredient_categories = pgTable("ingredient_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
});

// INGRÉDIENTS

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  unit: text("unit"),
  ingredient_category_id: integer("ingredient_category_id").references(
    () => ingredient_categories.id,
    { onDelete: "set null" }
  ),
  created_at: timestamp("created_at").defaultNow(),
});

// RECETTES (DISHES)

export const dishes = pgTable("dishes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  prep_time: integer("prep_time"),
  dish_category_id: integer("dish_category_id").references(
    () => dish_categories.id,
    { onDelete: "set null" }
  ),
  instructions: text("instructions"),
  image_url: text("image_url"),
  created_at: timestamp("created_at").defaultNow(),
});

// Table de liaison : ingrédients d'une recette
export const dish_ingredients = pgTable("dish_ingredients", {
  id: serial("id").primaryKey(),
  dish_id: integer("dish_id")
    .notNull()
    .references(() => dishes.id, { onDelete: "cascade" }),
  ingredient_id: integer("ingredient_id")
    .notNull()
    .references(() => ingredients.id, { onDelete: "cascade" }),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(), // Quantité pour 2 portions de base
});

// MENU (Planification des repas)

export const menu = pgTable("menu", {
  id: serial("id").primaryKey(),
  dish_id: integer("dish_id")
    .notNull()
    .references(() => dishes.id, { onDelete: "cascade" }),
  servings: integer("servings").notNull().default(1), // Nombre de personnes
  date: timestamp("date").notNull().defaultNow(), // Date d'ajout de la recette
  status: text("status", { enum: ["active", "locked", "cooked"] })
    .notNull()
    .default("active"),
  created_at: timestamp("created_at").defaultNow(),
});

// SHOPPING LIST (Liste de courses physique)

export const shopping_list = pgTable("shopping_list", {
  id: serial("id").primaryKey(),
  ingredient_id: integer("ingredient_id")
    .notNull()
    .references(() => ingredients.id, { onDelete: "cascade" }),
  quantity: decimal("quantity", { precision: 10, scale: 2 }),
  is_checked: boolean("is_checked").notNull().default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

//customized items (liste des articles ajoutés manuellement)

export const customized_items = pgTable("customized_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  is_checked: boolean("is_checked").notNull().default(false),
});

// ============================================================================
// RELATIONS (pour Drizzle queries)
// ============================================================================

// Relations pour dish_categories
export const dishCategoriesRelations = relations(
  dish_categories,
  ({ many }) => ({
    dishes: many(dishes),
  })
);

// Relations pour ingredient_categories
export const ingredientCategoriesRelations = relations(
  ingredient_categories,
  ({ many }) => ({
    ingredients: many(ingredients),
  })
);

// Relations pour ingredients
export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
  category: one(ingredient_categories, {
    fields: [ingredients.ingredient_category_id],
    references: [ingredient_categories.id],
  }),
  dish_ingredients: many(dish_ingredients),
  shopping_list_items: many(shopping_list),
}));

// Relations pour dishes
export const dishesRelations = relations(dishes, ({ one, many }) => ({
  category: one(dish_categories, {
    fields: [dishes.dish_category_id],
    references: [dish_categories.id],
  }),
  dish_ingredients: many(dish_ingredients),
  menu_items: many(menu),
}));

// Relations pour dish_ingredients
export const dishIngredientsRelations = relations(
  dish_ingredients,
  ({ one }) => ({
    dish: one(dishes, {
      fields: [dish_ingredients.dish_id],
      references: [dishes.id],
    }),
    ingredient: one(ingredients, {
      fields: [dish_ingredients.ingredient_id],
      references: [ingredients.id],
    }),
  })
);

// Relations pour menu
export const menuRelations = relations(menu, ({ one }) => ({
  dish: one(dishes, {
    fields: [menu.dish_id],
    references: [dishes.id],
  }),
}));

// Relations pour shopping_list
export const shoppingListRelations = relations(shopping_list, ({ one }) => ({
  ingredient: one(ingredients, {
    fields: [shopping_list.ingredient_id],
    references: [ingredients.id],
  }),
}));
