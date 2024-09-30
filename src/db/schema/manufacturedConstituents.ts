import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedConstituents = pgTable("manufactured_constituents_bt", {
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

export const manufacturedConstituentsRelations = relations(manufacturedConstituents, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [manufacturedConstituents.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedConstituent = typeof manufacturedConstituents.$inferSelect;
export type NewManufacturedConstituent = typeof manufacturedConstituents.$inferInsert;
