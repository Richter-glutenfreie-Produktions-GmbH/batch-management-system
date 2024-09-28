import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { doughs } from "./doughs";
import { ingredients } from "./ingredients";
import { products } from "./products";
import { recipeHasConstituents } from "./recipeHasConstituents";

export const constituents = pgTable("constituents_bt", {
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

export const constituentsRelations = relations(constituents, ({ one, many }) => ({
    ingredient: one(ingredients),
    product: one(products),
    dough: one(doughs),
    recipeHasConstituents: many(recipeHasConstituents),
}));

export type Constituent = typeof constituents.$inferSelect;
export type NewConstituent = typeof constituents.$inferInsert;
