import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { sellingUnits } from "./sellingUnits";

export const sellingUnitHierarchies = pgTable("selling_unit_hierarchies", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => sellingUnits.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id")
        .notNull()
        .references(() => nestables.id, { onDelete: "cascade" }),
});

export const sellingUnitHierarchiesRelations = relations(sellingUnitHierarchies, ({ one, many }) => ({
    sellingUnit: one(sellingUnits, {
        fields: [sellingUnitHierarchies.id],
        references: [sellingUnits.id],
    }),
    parent: one(nestables, {
        fields: [sellingUnitHierarchies.parentId],
        references: [nestables.id],
    }),
}));

export type SellingUnitHierarchy = typeof sellingUnitHierarchies.$inferSelect;
export type NewSellingUnitHierarchy = typeof sellingUnitHierarchies.$inferInsert;
