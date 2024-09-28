CREATE TABLE IF NOT EXISTS "nestables_bt" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "selling_unit_hierarchies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"parent_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "packaging_units" RENAME TO "selling_units";--> statement-breakpoint
ALTER TABLE "packages" DROP CONSTRAINT "packages_id_bundles_bt_id_fk";
--> statement-breakpoint
ALTER TABLE "selling_units" DROP CONSTRAINT "packaging_units_id_bundles_bt_id_fk";
--> statement-breakpoint
ALTER TABLE "palettes" DROP CONSTRAINT "palettes_id_bundles_bt_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nestables_bt" ADD CONSTRAINT "nestables_bt_id_bundles_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."bundles_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "selling_unit_hierarchies" ADD CONSTRAINT "selling_unit_hierarchies_id_selling_units_id_fk" FOREIGN KEY ("id") REFERENCES "public"."selling_units"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "selling_unit_hierarchies" ADD CONSTRAINT "selling_unit_hierarchies_parent_id_nestables_bt_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "packages" ADD CONSTRAINT "packages_id_nestables_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "selling_units" ADD CONSTRAINT "selling_units_id_bundles_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."bundles_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "palettes" ADD CONSTRAINT "palettes_id_nestables_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
