import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const dish_categories = pgTable("dish_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
})

export const ingredient_categories = pgTable("ingredient_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
})

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  unit: text("unit").notNull(),
  ingredient_category_id: integer("ingredient_category_id").notNull().references(() => ingredient_categories.id),
})

export const dish_ingredients = pgTable("dish_ingredients", {
  id: serial("id").primaryKey(),
  ingredient_id: integer("ingredient_id").notNull().references(() => ingredients.id,),
  dish_id: integer("dish_id").notNull().references(() => dishes.id, {onDelete: "cascade"}),
  quantity: integer("quantity").notNull(),
})

export const dishes = pgTable("dishes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Ajouté
  description: text("description").notNull(),
  instructions: text("instructions").notNull(),
  prep_time: integer("prep_time").notNull(),
  dish_category_id: integer("dish_category_id").notNull().references(() => dish_categories.id),
})

export const shopping_list = pgTable("shopping_list", {
  id:serial("id").primaryKey(),
  services: integer("services").notNull(),
  dish_id:integer("dish_id").references(()=>dishes.id,  {onDelete: "cascade"})
})