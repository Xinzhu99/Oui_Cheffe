CREATE TABLE "dish_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "dish_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "dish_ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"dish_id" integer NOT NULL,
	"ingredient_id" integer NOT NULL,
	"quantity" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"prep_time" integer,
	"dish_category_id" integer,
	"instructions" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ingredient_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "ingredient_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"unit" text,
	"ingredient_category_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"dish_id" integer NOT NULL,
	"servings" integer DEFAULT 1 NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "shopping_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"ingredient_id" integer NOT NULL,
	"quantity" numeric(10, 2),
	"source" text DEFAULT 'recipe' NOT NULL,
	"is_checked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dish_ingredients" ADD CONSTRAINT "dish_ingredients_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_dish_category_id_dish_categories_id_fk" FOREIGN KEY ("dish_category_id") REFERENCES "public"."dish_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_ingredient_category_id_ingredient_categories_id_fk" FOREIGN KEY ("ingredient_category_id") REFERENCES "public"."ingredient_categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "menu" ADD CONSTRAINT "menu_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shopping_list" ADD CONSTRAINT "shopping_list_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE no action;