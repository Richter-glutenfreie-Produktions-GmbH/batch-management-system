CREATE TABLE IF NOT EXISTS "batches_bt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" text NOT NULL,
	"expires_on" date NOT NULL,
	"note" text,
	"mass_value" double precision NOT NULL,
	"mass_unit_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "configurations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients_bt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	CONSTRAINT "ingredients_bt_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_batches" (
	"id" uuid PRIMARY KEY NOT NULL,
	"manufactured_on" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"batch_id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"current_recipe_id" uuid,
	"mass_value" double precision NOT NULL,
	"mass_unit_id" uuid NOT NULL,
	"is_active" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raw_materials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supply_item_id" uuid NOT NULL,
	"received_batches_id" uuid NOT NULL,
	"number" text NOT NULL,
	"override_is_vegan" boolean,
	"override_is_vegetarian" boolean,
	"override_is_turkish_halal" boolean,
	"override_is_jewish_kosher" boolean,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	CONSTRAINT "raw_materials_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "received_batches" (
	"id" uuid PRIMARY KEY NOT NULL,
	"delivered_on" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_has_ingredients_jt" (
	"ingredient_id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL,
	"amount_value" integer NOT NULL,
	"amount_unit_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	CONSTRAINT "recipe_has_ingredients_jt_ingredient_id_recipe_id_pk" PRIMARY KEY("ingredient_id","recipe_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"product_id" uuid NOT NULL,
	"is_obsolete" boolean NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "supply_items" (
	"id" uuid PRIMARY KEY NOT NULL,
	"is_vegan" boolean DEFAULT false NOT NULL,
	"is_vegetarian" boolean DEFAULT false NOT NULL,
	"is_turkish_halal" boolean DEFAULT true NOT NULL,
	"is_jewish_kosher" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unit_conversions" (
	"from_unit_id" uuid NOT NULL,
	"to_unit_id" uuid NOT NULL,
	"conversion_factor" double precision NOT NULL,
	"description" text,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL,
	CONSTRAINT "unit_conversions_from_unit_id_to_unit_id_pk" PRIMARY KEY("from_unit_id","to_unit_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"symbol" text NOT NULL,
	"label" text NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batches_bt" ADD CONSTRAINT "batches_bt_mass_unit_id_units_id_fk" FOREIGN KEY ("mass_unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_batches" ADD CONSTRAINT "manufactured_batches_id_batches_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."batches_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_batches" ADD CONSTRAINT "product_batches_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_batches" ADD CONSTRAINT "product_batches_batch_id_manufactured_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."manufactured_batches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_batches" ADD CONSTRAINT "product_batches_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_id_ingredients_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."ingredients_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_current_recipe_id_recipes_id_fk" FOREIGN KEY ("current_recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_supply_item_id_supply_items_id_fk" FOREIGN KEY ("supply_item_id") REFERENCES "public"."supply_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_received_batches_id_received_batches_id_fk" FOREIGN KEY ("received_batches_id") REFERENCES "public"."received_batches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "received_batches" ADD CONSTRAINT "received_batches_id_batches_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."batches_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_has_ingredients_jt" ADD CONSTRAINT "recipe_has_ingredients_jt_ingredient_id_ingredients_bt_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_has_ingredients_jt" ADD CONSTRAINT "recipe_has_ingredients_jt_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_has_ingredients_jt" ADD CONSTRAINT "recipe_has_ingredients_jt_amount_unit_id_units_id_fk" FOREIGN KEY ("amount_unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "supply_items" ADD CONSTRAINT "supply_items_id_ingredients_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."ingredients_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_conversions" ADD CONSTRAINT "unit_conversions_from_unit_id_units_id_fk" FOREIGN KEY ("from_unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_conversions" ADD CONSTRAINT "unit_conversions_to_unit_id_units_id_fk" FOREIGN KEY ("to_unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
