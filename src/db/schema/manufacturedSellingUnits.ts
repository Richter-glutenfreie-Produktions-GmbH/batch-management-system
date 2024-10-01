import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";
import { sellingUnits } from "./sellingUnits";

export const manufacturedSellingUnits = pgTable("manufactured_selling_units", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    sellingUnitId: uuid("id").notNull().references(() => sellingUnits.id),
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

export const manufacturedSellingUnitsRelations = relations(manufacturedSellingUnits, ({ one, many }) => ({
    sellingUnit: one(sellingUnits, {
        fields: [manufacturedSellingUnits.sellingUnitId],
        references: [sellingUnits.id]
    }),
    tenant: one(tenants, {
        fields: [manufacturedSellingUnits.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedSellingUnit = typeof manufacturedSellingUnits.$inferSelect;
export type NewManufacturedSellingUnit = typeof manufacturedSellingUnits.$inferInsert;
