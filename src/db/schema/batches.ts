import { relations, sql } from "drizzle-orm";
import { date, doublePrecision, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { units } from "./units";

export const batches = pgTable("batches_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    number: text("number").notNull(),
    expiresOn: date("expires_on")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP + INTERVAL '1 year'`),
    note: text("note"),
    massValue: doublePrecision("mass_value").notNull(),
    massUnitId: uuid("mass_unit_id")
        .notNull()
        .references(() => units.id, { onDelete: "cascade" }),
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
});

export type Batch = typeof batches.$inferSelect;
export type NewBatch = typeof batches.$inferInsert;

export const batchesRelations = relations(batches, ({ one, many }) => ({
    massUnit: one(units, {
        fields: [batches.massUnitId],
        references: [units.id],
    }),
}));
