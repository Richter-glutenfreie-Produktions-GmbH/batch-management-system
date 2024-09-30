import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { recipes } from "./recipes";
import { tenants } from "./tenants";

export const recipeHasConstituents = pgTable(
    "recipe_has_constituents_jt",
    {
        constituentId: uuid("constituent_id")
            .notNull()
            .references(() => constituents.id, { onDelete: "cascade", onUpdate: "cascade" }),
        recipeId: uuid("recipe_id")
            .notNull()
            .references(() => recipes.id, { onDelete: "cascade", onUpdate: "cascade" }),
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
    tenant: one(tenants, {
        fields: [recipeHasConstituents.tenantId],
        references: [tenants.id],
    }),
}));

export type RecipeHasConstituent = typeof recipeHasConstituents.$inferSelect;
export type NewRecipeHasConstituent = typeof recipeHasConstituents.$inferInsert;
