import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { recipes } from "./recipes";
import { tenants } from "./tenants";

export const manufacturedRecipes = pgTable("manufactured_recipes", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    recipeId: uuid("id")
        .notNull()
        .references(() => recipes.id),
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
    tenantId: uuid("tenant_id").references(() => tenants.id),
});

export const manufacturedRecipesRelations = relations(manufacturedRecipes, ({ one, many }) => ({
    recipe: one(recipes, {
        fields: [manufacturedRecipes.recipeId],
        references: [recipes.id],
    }),
    tenant: one(tenants, {
        fields: [manufacturedRecipes.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedRecipe = typeof manufacturedRecipes.$inferSelect;
export type NewManufacturedRecipe = typeof manufacturedRecipes.$inferInsert;
