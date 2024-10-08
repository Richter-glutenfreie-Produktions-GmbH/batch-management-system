import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { doughs } from "./doughs";
import { tenants } from "./tenants";

export const manufacturedDoughs = pgTable("manufactured_doughs", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    doughId: uuid("id")
        .notNull()
        .references(() => doughs.id),
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

export const manufacturedDoughsRelations = relations(manufacturedDoughs, ({ one, many }) => ({
    dough: one(doughs, {
        fields: [manufacturedDoughs.doughId],
        references: [doughs.id],
    }),
    tenant: one(tenants, {
        fields: [manufacturedDoughs.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedDough = typeof manufacturedDoughs.$inferSelect;
export type NewManufacturedDough = typeof manufacturedDoughs.$inferInsert;
