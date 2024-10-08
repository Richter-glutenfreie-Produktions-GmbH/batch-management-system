import { relations } from "drizzle-orm";
import { AnyPgColumn, boolean, doublePrecision, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { goods } from "./goods";
import { recipes } from "./recipes";
import { tenants } from "./tenants";

export const products = pgTable("products", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => goods.id, { onDelete: "cascade", onUpdate: "cascade" }),
    isActive: boolean("is_active").notNull().default(true),
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

export const productsRelations = relations(products, ({ one, many }) => ({
    good: one(goods, {
        fields: [products.id],
        references: [goods.id],
    }),
    tenant: one(tenants, {
        fields: [products.tenantId],
        references: [tenants.id],
    }),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
