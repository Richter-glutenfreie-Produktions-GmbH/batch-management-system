import { relations } from "drizzle-orm";
import { date, pgTable, uuid } from "drizzle-orm/pg-core";

import { batches } from "./batches";
import { tenants } from "./tenants";

export const manufacturedBatches = pgTable("manufactured_batches", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => batches.id, { onDelete: "cascade" }),
    manufacturedOn: date("manufactured_on").notNull().defaultNow(),
    tenantId: uuid("tenant_id")
        .notNull()
        .references(() => tenants.id, { onDelete: "cascade" }),
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
