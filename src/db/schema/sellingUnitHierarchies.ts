import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { sellingUnits } from "./sellingUnits";
import { tenants } from "./tenants";

export const sellingUnitHierarchies = pgTable("selling_unit_hierarchies", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => sellingUnits.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id")
        .notNull()
        .references(() => nestables.id, { onDelete: "cascade" }),
    insertedAt: timestamp("inserted_at", {
        mode: "date",
        precision: 3,
        withTimezone: false,
    })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", {
        mode: "date",
        precision: 3,
        withTimezone: false,
    })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    tenantId: uuid("tenant_id")
        .notNull()
        .references(() => tenants.id, { onDelete: "cascade" }),
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
    tenant: one(tenants, {
        fields: [sellingUnitHierarchies.tenantId],
        references: [tenants.id],
    }),
}));

export type SellingUnitHierarchy = typeof sellingUnitHierarchies.$inferSelect;
export type NewSellingUnitHierarchy = typeof sellingUnitHierarchies.$inferInsert;
