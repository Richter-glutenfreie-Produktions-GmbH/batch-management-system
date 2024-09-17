DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_mass_unit_id_units_id_fk" FOREIGN KEY ("mass_unit_id") REFERENCES "public"."units"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
