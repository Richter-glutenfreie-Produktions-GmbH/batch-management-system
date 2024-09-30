import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedBundles = pgTable("manufactured_bundles_bt", {
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
    tenantId: uuid("tenant_id")
        .notNull()
        .references(() => tenants.id),
});

export const manufacturedBundlesRelations = relations(manufacturedBundles, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [manufacturedBundles.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedBundle = typeof manufacturedBundles.$inferSelect;
export type NewManufacturedBundle = typeof manufacturedBundles.$inferInsert;
