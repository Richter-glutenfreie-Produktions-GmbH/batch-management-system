import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { batches } from "./batches";
import { products } from "./products";
import { tenants } from "./tenants";
import { unitConversions } from "./unitConversions";

export const units = pgTable("units", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    symbol: text("symbol").notNull(),
    label: text("label").notNull(),
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

export const unitsRelations = relations(units, ({ one, many }) => ({
    fromUnits: many(unitConversions, { relationName: "fromUnit" }),
    toUnits: many(unitConversions, { relationName: "toUnit" }),
    tenant: one(tenants, {
        fields: [units.tenantId],
        references: [tenants.id],
    }),
}));

export type Unit = typeof units.$inferSelect;
export type NewUnit = typeof units.$inferInsert;
