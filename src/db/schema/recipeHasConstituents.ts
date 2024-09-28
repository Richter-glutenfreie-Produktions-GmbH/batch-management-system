import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { recipes } from "./recipes";

export const recipeHasConstituents = pgTable(
    "recipe_has_constituents_jt",
    {
        constituentId: uuid("constituent_id")
            .notNull()
            .references(() => constituents.id, { onDelete: "cascade" }),
        recipeId: uuid("recipe_id")
            .notNull()
            .references(() => recipes.id, { onDelete: "cascade" }),
        // amountValue: integer("amount_value").notNull(),
        // amountUnitId: uuid("amount_unit_id")
        //     .notNull()
        //     .references(() => units.id, { onDelete: "cascade" }),
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
        pk: primaryKey(table.constituentId, table.recipeId),
    }),
);

export const recipeHasConstituentsRelations = relations(recipeHasConstituents, ({ one }) => ({
    constituent: one(constituents, {
        fields: [recipeHasConstituents.constituentId],
        references: [constituents.id],
    }),
    recipe: one(recipes, {
        fields: [recipeHasConstituents.recipeId],
        references: [recipes.id],
    }),
}));

export type RecipeHasIngredient = typeof recipeHasConstituents.$inferSelect;
export type NewRecipeHasIngredient = typeof recipeHasConstituents.$inferInsert;
