import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { products } from "./products";
import { tenants } from "./tenants";

export const manufacturedProducts = pgTable("manufactured_products", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    productId: uuid("id")
        .notNull()
        .references(() => products.id),
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
    product: one(products, {
        fields: [manufacturedProducts.productId],
        references: [products.id],
    }),
    tenant: one(tenants, {
        fields: [manufacturedProducts.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedProduct = typeof manufacturedProducts.$inferSelect;
export type NewManufacturedProduct = typeof manufacturedProducts.$inferInsert;
