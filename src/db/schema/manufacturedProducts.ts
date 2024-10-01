import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedProducts = pgTable("manufactured_products", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
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

export const manufacturedProductsRelations = relations(manufacturedProducts, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [manufacturedProducts.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedProduct = typeof manufacturedProducts.$inferSelect;
export type NewManufacturedProduct = typeof manufacturedProducts.$inferInsert;
