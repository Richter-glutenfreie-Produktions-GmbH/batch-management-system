import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { bundles } from "./bundles";

export const sellingUnits = pgTable("selling_units", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => bundles.id, { onDelete: "cascade" }),
});

export const sellingUnitsRelations = relations(sellingUnits, ({ one, many }) => ({
    bundle: one(bundles, {
        fields: [sellingUnits.id],
        references: [bundles.id],
    }),
}));

export type SellingUnit = typeof sellingUnits.$inferSelect;
export type NewSellingUnit = typeof sellingUnits.$inferInsert;
