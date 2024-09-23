import { pgTable, uuid } from "drizzle-orm/pg-core";

import { bundles } from "./bundles";

export const packagingUnits = pgTable("packaging_units", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => bundles.id, { onDelete: "cascade" }),
});

export type PackagingUnit = typeof packagingUnits.$inferSelect;
export type NewPackagingUnit = typeof packagingUnits.$inferInsert;
