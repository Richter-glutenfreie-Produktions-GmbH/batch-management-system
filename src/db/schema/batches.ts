import { relations, sql } from "drizzle-orm";
import { date, doublePrecision, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { sellingUnits } from "./sellingUnits";
import { tenants } from "./tenants";

export const batches = pgTable("batches_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    number: text("number").notNull(),
    expiresOn: date("expires_on")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP + INTERVAL '1 year'`),
    note: text("note"),
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

export const batchesRelations = relations(batches, ({ one, many }) => ({
    sellingUnits: many(sellingUnits),
    tenant: one(tenants, {
        fields: [batches.tenantId],
        references: [tenants.id],
    }),
}));

export type Batch = typeof batches.$inferSelect;
export type NewBatch = typeof batches.$inferInsert;
