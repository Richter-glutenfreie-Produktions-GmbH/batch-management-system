import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { products } from "./products";
import { recipeHasConstituents } from "./recipeHasConstituents";

export const recipes = pgTable("recipes", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name"),
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    isObsolete: boolean("is_obsolete").notNull().default(false),
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

export const recipesRelations = relations(recipes, ({ one, many }) => ({
    product: one(products, {
        fields: [recipes.productId],
        references: [products.id],
    }),
    // productBatches: many(productBatches),
    recipeHasConstituents: many(recipeHasConstituents),
}));

export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;
