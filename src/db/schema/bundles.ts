import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { sellingUnits } from "./sellingUnits";

export const bundles = pgTable("bundles_bt", {
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
});

export const bundlesRelations = relations(bundles, ({ one, many }) => ({
    sellingUnit: one(sellingUnits),
    nestable: one(nestables),
}));

export type Bundle = typeof bundles.$inferSelect;
export type NewBundle = typeof bundles.$inferInsert;
