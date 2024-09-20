CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "recipe_has_ingredients_jt" DROP CONSTRAINT "recipe_has_ingredients_jt_amount_unit_id_units_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_mass_unit_id_units_id_fk" FOREIGN KEY ("mass_unit_id") REFERENCES "public"."units"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "recipe_has_ingredients_jt" DROP COLUMN IF EXISTS "amount_value";--> statement-breakpoint
ALTER TABLE "recipe_has_ingredients_jt" DROP COLUMN IF EXISTS "amount_unit_id";