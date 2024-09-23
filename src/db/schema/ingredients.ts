import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { recipeHasIngredients } from "./recipeHasIngredients";

export const ingredients = pgTable("ingredients", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => constituents.id, { onDelete: "cascade" }),
    number: text("number").notNull().unique(),
    name: text("name").notNull(),
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
});

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
    recipeHasIngredients: many(recipeHasIngredients),
}));
