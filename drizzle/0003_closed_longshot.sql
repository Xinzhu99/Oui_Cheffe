ALTER TABLE "shopping_list" DROP CONSTRAINT "shopping_list_ingredient_id_ingredients_id_fk";
--> statement-breakpoint
ALTER TABLE "shopping_list" ADD COLUMN "services" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "shopping_list" DROP COLUMN "ingredient_id";--> statement-breakpoint
ALTER TABLE "shopping_list" DROP COLUMN "quantity";