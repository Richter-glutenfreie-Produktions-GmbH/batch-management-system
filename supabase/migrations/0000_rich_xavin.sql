CREATE TABLE IF NOT EXISTS "batches_bt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" text NOT NULL,
	"expires_on" date DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 year' NOT NULL,
	"note" text,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bundles_bt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "configurations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version" integer NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "constituents_bt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "doughs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "goods_bt" (
	"id" uuid PRIMARY KEY NOT NULL,
	"current_recipe_id" uuid,
	"number" text NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid,
	CONSTRAINT "goods_bt_tenant_id_number_unique" UNIQUE("tenant_id","number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" uuid PRIMARY KEY NOT NULL,
	"number" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_vegan" boolean DEFAULT false NOT NULL,
	"is_vegetarian" boolean DEFAULT false NOT NULL,
	"is_turkish_halal" boolean DEFAULT true NOT NULL,
	"is_jewish_kosher" boolean DEFAULT true NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid,
	CONSTRAINT "ingredients_tenant_id_number_unique" UNIQUE("tenant_id","number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_batches" (
	"id" uuid PRIMARY KEY NOT NULL,
	"manufactured_on" date DEFAULT now() NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_bundles_bt" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bundle_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_constituents_bt" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_doughs" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_goods_bt" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_nestables_bt" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_package_hierarchies_bt" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_packages" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_palettes" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_products" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_recipe_has_constituents_jt" (
	"manufactured_constituent_id" uuid NOT NULL,
	"manufactured_recipe_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid,
	CONSTRAINT "manufactured_recipe_has_constituents_jt_manufactured_constituent_id_manufactured_recipe_id_pk" PRIMARY KEY("manufactured_constituent_id","manufactured_recipe_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_recipes" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_selling_unit_hierarchies_bt" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufactured_selling_units" (
	"id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nestables_bt" (
	"id" uuid PRIMARY KEY NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "package_hierarchies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"parent_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "packages" (
	"id" uuid PRIMARY KEY NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "palettes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "raw_materials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ingredient_id" uuid NOT NULL,
	"received_batches_id" uuid NOT NULL,
	"number" text NOT NULL,
	"override_is_vegan" boolean,
	"override_is_vegetarian" boolean,
	"override_is_turkish_halal" boolean,
	"override_is_jewish_kosher" boolean,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid,
	CONSTRAINT "raw_materials_tenant_id_number_unique" UNIQUE("tenant_id","number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "received_batches" (
	"id" uuid PRIMARY KEY NOT NULL,
	"delivered_on" date DEFAULT now() NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_has_constituents_jt" (
	"constituent_id" uuid NOT NULL,
	"recipe_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid,
	CONSTRAINT "recipe_has_constituents_jt_constituent_id_recipe_id_pk" PRIMARY KEY("constituent_id","recipe_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"good_id" uuid NOT NULL,
	"predecessor_id" uuid,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "selling_unit_hierarchies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"parent_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "selling_units" (
	"id" uuid PRIMARY KEY NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "unit_conversions_jt" (
	"from_unit_id" uuid NOT NULL,
	"to_unit_id" uuid NOT NULL,
	"conversion_factor" double precision NOT NULL,
	"description" text,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid,
	CONSTRAINT "unit_conversions_jt_from_unit_id_to_unit_id_pk" PRIMARY KEY("from_unit_id","to_unit_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"symbol" text NOT NULL,
	"label" text NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	"tenant_id" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batches_bt" ADD CONSTRAINT "batches_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bundles_bt" ADD CONSTRAINT "bundles_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "constituents_bt" ADD CONSTRAINT "constituents_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doughs" ADD CONSTRAINT "doughs_id_goods_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."goods_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "doughs" ADD CONSTRAINT "doughs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goods_bt" ADD CONSTRAINT "goods_bt_id_constituents_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."constituents_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goods_bt" ADD CONSTRAINT "goods_bt_current_recipe_id_recipes_id_fk" FOREIGN KEY ("current_recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goods_bt" ADD CONSTRAINT "goods_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_id_constituents_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."constituents_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_batches" ADD CONSTRAINT "manufactured_batches_id_batches_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."batches_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_batches" ADD CONSTRAINT "manufactured_batches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_bundles_bt" ADD CONSTRAINT "manufactured_bundles_bt_bundle_id_bundles_bt_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles_bt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_bundles_bt" ADD CONSTRAINT "manufactured_bundles_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_constituents_bt" ADD CONSTRAINT "manufactured_constituents_bt_id_constituents_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."constituents_bt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_constituents_bt" ADD CONSTRAINT "manufactured_constituents_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_doughs" ADD CONSTRAINT "manufactured_doughs_id_doughs_id_fk" FOREIGN KEY ("id") REFERENCES "public"."doughs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_doughs" ADD CONSTRAINT "manufactured_doughs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_goods_bt" ADD CONSTRAINT "manufactured_goods_bt_id_goods_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."goods_bt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_goods_bt" ADD CONSTRAINT "manufactured_goods_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_nestables_bt" ADD CONSTRAINT "manufactured_nestables_bt_id_nestables_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."nestables_bt"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_nestables_bt" ADD CONSTRAINT "manufactured_nestables_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_package_hierarchies_bt" ADD CONSTRAINT "manufactured_package_hierarchies_bt_id_package_hierarchies_id_fk" FOREIGN KEY ("id") REFERENCES "public"."package_hierarchies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_package_hierarchies_bt" ADD CONSTRAINT "manufactured_package_hierarchies_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_packages" ADD CONSTRAINT "manufactured_packages_id_packages_id_fk" FOREIGN KEY ("id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_packages" ADD CONSTRAINT "manufactured_packages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_palettes" ADD CONSTRAINT "manufactured_palettes_id_palettes_id_fk" FOREIGN KEY ("id") REFERENCES "public"."palettes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_palettes" ADD CONSTRAINT "manufactured_palettes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_products" ADD CONSTRAINT "manufactured_products_id_products_id_fk" FOREIGN KEY ("id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_products" ADD CONSTRAINT "manufactured_products_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_recipe_has_constituents_jt" ADD CONSTRAINT "manufactured_recipe_has_constituents_jt_manufactured_constituent_id_manufactured_constituents_bt_id_fk" FOREIGN KEY ("manufactured_constituent_id") REFERENCES "public"."manufactured_constituents_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_recipe_has_constituents_jt" ADD CONSTRAINT "manufactured_recipe_has_constituents_jt_manufactured_recipe_id_manufactured_recipes_id_fk" FOREIGN KEY ("manufactured_recipe_id") REFERENCES "public"."manufactured_recipes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_recipe_has_constituents_jt" ADD CONSTRAINT "manufactured_recipe_has_constituents_jt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_recipes" ADD CONSTRAINT "manufactured_recipes_id_recipes_id_fk" FOREIGN KEY ("id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_recipes" ADD CONSTRAINT "manufactured_recipes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_selling_unit_hierarchies_bt" ADD CONSTRAINT "manufactured_selling_unit_hierarchies_bt_id_selling_unit_hierarchies_id_fk" FOREIGN KEY ("id") REFERENCES "public"."selling_unit_hierarchies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_selling_unit_hierarchies_bt" ADD CONSTRAINT "manufactured_selling_unit_hierarchies_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_selling_units" ADD CONSTRAINT "manufactured_selling_units_id_selling_units_id_fk" FOREIGN KEY ("id") REFERENCES "public"."selling_units"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufactured_selling_units" ADD CONSTRAINT "manufactured_selling_units_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nestables_bt" ADD CONSTRAINT "nestables_bt_id_bundles_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."bundles_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nestables_bt" ADD CONSTRAINT "nestables_bt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "package_hierarchies" ADD CONSTRAINT "package_hierarchies_id_packages_id_fk" FOREIGN KEY ("id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "package_hierarchies" ADD CONSTRAINT "package_hierarchies_parent_id_palettes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."palettes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "package_hierarchies" ADD CONSTRAINT "package_hierarchies_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_id_nestables_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "palettes" ADD CONSTRAINT "palettes_id_nestables_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "palettes" ADD CONSTRAINT "palettes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_id_goods_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."goods_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_received_batches_id_received_batches_id_fk" FOREIGN KEY ("received_batches_id") REFERENCES "public"."received_batches"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "received_batches" ADD CONSTRAINT "received_batches_id_batches_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."batches_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "received_batches" ADD CONSTRAINT "received_batches_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_has_constituents_jt" ADD CONSTRAINT "recipe_has_constituents_jt_constituent_id_constituents_bt_id_fk" FOREIGN KEY ("constituent_id") REFERENCES "public"."constituents_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_has_constituents_jt" ADD CONSTRAINT "recipe_has_constituents_jt_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_has_constituents_jt" ADD CONSTRAINT "recipe_has_constituents_jt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_good_id_goods_bt_id_fk" FOREIGN KEY ("good_id") REFERENCES "public"."goods_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_predecessor_id_recipes_id_fk" FOREIGN KEY ("predecessor_id") REFERENCES "public"."recipes"("id") ON DELETE set default ON UPDATE set default;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "selling_unit_hierarchies" ADD CONSTRAINT "selling_unit_hierarchies_id_selling_units_id_fk" FOREIGN KEY ("id") REFERENCES "public"."selling_units"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "selling_unit_hierarchies" ADD CONSTRAINT "selling_unit_hierarchies_parent_id_nestables_bt_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "selling_unit_hierarchies" ADD CONSTRAINT "selling_unit_hierarchies_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "selling_units" ADD CONSTRAINT "selling_units_id_bundles_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."bundles_bt"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "selling_units" ADD CONSTRAINT "selling_units_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "settings" ADD CONSTRAINT "settings_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_conversions_jt" ADD CONSTRAINT "unit_conversions_jt_from_unit_id_units_id_fk" FOREIGN KEY ("from_unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_conversions_jt" ADD CONSTRAINT "unit_conversions_jt_to_unit_id_units_id_fk" FOREIGN KEY ("to_unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "unit_conversions_jt" ADD CONSTRAINT "unit_conversions_jt_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "units" ADD CONSTRAINT "units_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
