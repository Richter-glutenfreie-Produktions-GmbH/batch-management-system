import { relations } from "drizzle-orm";
import { AnyPgColumn, boolean, doublePrecision, pgTable, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { recipes } from "./recipes";
import { units } from "./units";

export const products = pgTable("products", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => constituents.id, { onDelete: "cascade" }),
    currentRecipeId: uuid("current_recipe_id").references((): AnyPgColumn => recipes.id),
    massValue: doublePrecision("mass_value").notNull(),
    massUnitId: uuid("mass_unit_id")
        .notNull()
        .references(() => units.id),
    isActive: boolean("is_active").notNull().default(true),
});

export const productsRelations = relations(products, ({ one, many }) => ({
    constituent: one(constituents, {
        fields: [products.id],
        references: [constituents.id],
    }),
    currentRecipe: one(recipes, {
        fields: [products.currentRecipeId],
        references: [recipes.id],
    }),
    massUnit: one(units, {
        fields: [products.massUnitId],
        references: [units.id],
    }),
    recipes: many(recipes),
    // productBatches: many(productBatches),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
