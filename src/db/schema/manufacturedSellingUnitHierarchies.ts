import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";
import { sellingUnitHierarchies } from "./sellingUnitHierarchies";

export const manufacturedSellingUnitHierarchies = pgTable("manufactured_selling_unit_hierarchies_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    sellingUnitHierarchyId: uuid("id").notNull().references(() => sellingUnitHierarchies.id),
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
    tenantId: uuid("tenant_id").references(() => tenants.id),
});

export const manufacturedSellingUnitHierarchiesRelations = relations(
    manufacturedSellingUnitHierarchies,
    ({ one, many }) => ({
        sellingUnitHierarchy: one(sellingUnitHierarchies, {
            fields: [manufacturedSellingUnitHierarchies.sellingUnitHierarchyId],
            references: [sellingUnitHierarchies.id]
        }),
        tenant: one(tenants, {
            fields: [manufacturedSellingUnitHierarchies.tenantId],
            references: [tenants.id],
        }),
    }),
);

export type ManufacturedSellingUnitHierarchy = typeof manufacturedSellingUnitHierarchies.$inferSelect;
export type NewManufacturedSellingUnitHierarchy = typeof manufacturedSellingUnitHierarchies.$inferInsert;
