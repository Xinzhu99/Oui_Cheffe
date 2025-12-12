CREATE TABLE "menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"dish_id" integer NOT NULL,
	"servings" integer DEFAULT 1 NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "dish_ingredients" DROP CONSTRAINT "dish_ingredients_ingredient_id_ingredients_id_fk";
--> statement-breakpoint
ALTER TABLE "dishes" DROP CONSTRAINT "dishes_dish_category_id_dish_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "ingredients" DROP CONSTRAINT "ingredients_ingredient_category_id_ingredient_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "shopping_list" DROP CONSTRAINT "shopping_list_dish_id_dishes_id_fk";
--> statement-breakpoint
ALTER TABLE "dish_ingredients" ALTER COLUMN "quantity" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "instructions" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "prep_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "dish_category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ingredients" ALTER COLUMN "ingredient_category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dish_categories" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "dishes" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "dishes" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "ingredient_categories" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "ingredients" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "shopping_list" ADD COLUMN "ingredient_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "shopping_list" ADD COLUMN "quantity" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "shopping_list" ADD COLUMN "source" text DEFAULT 'recipe' NOT NULL;--> statement-breakpoint
ALTER TABLE "shopping_list" ADD COLUMN "is_checked" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "shopping_list" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "shopping_list" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "menu" ADD CONSTRAINT "menu_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_dish_category_id_dish_categories_id_fk" FOREIGN KEY ("dish_category_id") REFERENCES "public"."dish_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_ingredient_category_id_ingredient_categories_id_fk" FOREIGN KEY ("ingredient_category_id") REFERENCES "public"."ingredient_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shopping_list" ADD CONSTRAINT "shopping_list_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dishes" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "shopping_list" DROP COLUMN "services";--> statement-breakpoint
ALTER TABLE "shopping_list" DROP COLUMN "dish_id";--> statement-breakpoint
ALTER TABLE "dish_categories" ADD CONSTRAINT "dish_categories_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "ingredient_categories" ADD CONSTRAINT "ingredient_categories_name_unique" UNIQUE("name");