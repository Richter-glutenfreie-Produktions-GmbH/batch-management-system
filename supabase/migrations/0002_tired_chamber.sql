CREATE TABLE IF NOT EXISTS "package_hierarchies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"parent_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "package_hierarchies" ADD CONSTRAINT "package_hierarchies_id_packages_id_fk" FOREIGN KEY ("id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "package_hierarchies" ADD CONSTRAINT "package_hierarchies_parent_id_palettes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."palettes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
