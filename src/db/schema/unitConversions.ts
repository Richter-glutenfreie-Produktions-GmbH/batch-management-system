import { relations } from "drizzle-orm";
import { doublePrecision, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { units } from "./units";

export const unitConversions = pgTable(
    "unit_conversions",
    {
        fromUnitId: uuid("from_unit_id")
            .notNull()
            .references(() => units.id, { onDelete: "cascade" }),
        toUnitId: uuid("to_unit_id")
            .notNull()
            .references(() => units.id, { onDelete: "cascade" }),
        conversionFactor: doublePrecision("conversion_factor").notNull(),
        description: text("description"),
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
    },
    (table) => ({
        pk: primaryKey(table.fromUnitId, table.toUnitId),
    }),
);

export const unitConversionsRelations = relations(unitConversions, ({ one }) => ({
    fromUnit: one(units, {
        fields: [unitConversions.fromUnitId],
        references: [units.id],
        relationName: "fromUnit",
    }),
    toUnit: one(units, {
        fields: [unitConversions.toUnitId],
        references: [units.id],
        relationName: "toUnit",
    }),
}));

export type UnitConversion = typeof unitConversions.$inferSelect;
export type NewUnitConversion = typeof unitConversions.$inferInsert;
