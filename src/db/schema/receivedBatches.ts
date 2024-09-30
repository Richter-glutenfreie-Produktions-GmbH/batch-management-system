import { relations } from "drizzle-orm";
import { date, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { batches } from "./batches";
import { rawMaterials } from "./rawMaterials";
import { tenants } from "./tenants";

export const receivedBatches = pgTable("received_batches", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => batches.id, { onDelete: "cascade" }),
    deliveredOn: date("delivered_on").notNull().defaultNow(),
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

export const receivedBatchesRelations = relations(receivedBatches, ({ one, many }) => ({
    batch: one(batches, {
        fields: [receivedBatches.id],
        references: [batches.id],
    }),
    rawMaterials: many(rawMaterials),
    tenant: one(tenants, {
        fields: [receivedBatches.tenantId],
        references: [tenants.id],
    }),
}));

export type ReceivedBatch = typeof receivedBatches.$inferSelect;
export type NewReceivedBatch = typeof receivedBatches.$inferInsert;
