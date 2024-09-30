import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedNestables = pgTable("manufactured_nestables_bt", {
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
        .references(() => tenants.id, { onDelete: "cascade" }),
});

export const manufacturedNestablesRelations = relations(manufacturedNestables, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [manufacturedNestables.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedNestable = typeof manufacturedNestables.$inferSelect;
export type NewManufacturedNestable = typeof manufacturedNestables.$inferInsert;
