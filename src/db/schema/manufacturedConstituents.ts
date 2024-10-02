import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { tenants } from "./tenants";

export const manufacturedConstituents = pgTable("manufactured_constituents_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    constituentId: uuid("id")
        .notNull()
        .references(() => constituents.id),
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

export const manufacturedConstituentsRelations = relations(manufacturedConstituents, ({ one, many }) => ({
    constituent: one(constituents, {
        fields: [manufacturedConstituents.constituentId],
        references: [constituents.id],
    }),
    tenant: one(tenants, {
        fields: [manufacturedConstituents.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedConstituent = typeof manufacturedConstituents.$inferSelect;
export type NewManufacturedConstituent = typeof manufacturedConstituents.$inferInsert;
