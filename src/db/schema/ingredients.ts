import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { recipeHasConstituents } from "./recipeHasConstituents";

export const ingredients = pgTable("ingredients", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => constituents.id, { onDelete: "cascade" }),
    number: text("number").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    isVegan: boolean("is_vegan").notNull().default(false),
    isVegetarian: boolean("is_vegetarian").notNull().default(false),
    isTurkishHalal: boolean("is_turkish_halal").notNull().default(true),
    isJewishKosher: boolean("is_jewish_kosher").notNull().default(true),
});

export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
    constituent: one(constituents, {
        fields: [ingredients.id],
        references: [constituents.id],
    }),
    recipeHasConstituents: many(recipeHasConstituents),
}));

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
