import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedPackages = pgTable("manufactured_packages", {
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

export const manufacturedPackagesRelations = relations(manufacturedPackages, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [manufacturedPackages.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedPackage = typeof manufacturedPackages.$inferSelect;
export type NewManufacturedPackage = typeof manufacturedPackages.$inferInsert;
