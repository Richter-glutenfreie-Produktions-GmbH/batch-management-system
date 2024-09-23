import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { ingredients } from "./ingredients";
import { recipes } from "./recipes";

export const recipeHasIngredients = pgTable(
    "recipe_has_ingredients_jt",
    {
        ingredientId: uuid("ingredient_id")
            .notNull()
            .references(() => ingredients.id, { onDelete: "cascade" }),
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
        pk: primaryKey(table.ingredientId, table.recipeId),
    }),
);

export type RecipeHasIngredient = typeof recipeHasIngredients.$inferSelect;
export type NewRecipeHasIngredient = typeof recipeHasIngredients.$inferInsert;

export const recipeHasIngredientsRelations = relations(recipeHasIngredients, ({ one }) => ({
    ingredient: one(ingredients, {
        fields: [recipeHasIngredients.ingredientId],
        references: [ingredients.id],
    }),
    recipe: one(recipes, {
        fields: [recipeHasIngredients.recipeId],
        references: [recipes.id],
    }),
    // amountUnit: one(units, {
    //     fields: [recipeHasIngredients.amountUnitId],
    //     references: [units.id],
    // }),
}));
