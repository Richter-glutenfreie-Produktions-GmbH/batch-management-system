import { relations } from "drizzle-orm";
import { date, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { batches } from "./batches";
import { tenants } from "./tenants";

export const manufacturedBatches = pgTable("manufactured_batches", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => batches.id, { onDelete: "cascade", onUpdate: "cascade" }),
    manufacturedOn: date("manufactured_on").notNull().defaultNow(),
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

export const manufacturedBatchesRelations = relations(manufacturedBatches, ({ one, many }) => ({
    batch: one(batches, {
        fields: [manufacturedBatches.id],
        references: [batches.id],
    }),
    tenant: one(tenants, {
        fields: [manufacturedBatches.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedBatch = typeof manufacturedBatches.$inferSelect;
export type NewManufacturedBatch = typeof manufacturedBatches.$inferInsert;
