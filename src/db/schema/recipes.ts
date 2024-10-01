import { relations } from "drizzle-orm";
import { AnyPgColumn, boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { goods } from "./goods";
import { recipeHasConstituents } from "./recipeHasConstituents";
import { tenants } from "./tenants";

export const recipes = pgTable("recipes", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name"),
    goodId: uuid("good_id")
        .notNull()
        .references(() => goods.id, { onDelete: "cascade", onUpdate: "cascade" }),
    predecessorId: uuid("predecessor_id").references((): AnyPgColumn => recipes.id, {
        onDelete: "set default",
        onUpdate: "set default",
    }),
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

export const recipesRelations = relations(recipes, ({ one, many }) => ({
    good: one(goods, {
        fields: [recipes.goodId],
        references: [goods.id],
    }),
    recipeHasConstituents: many(recipeHasConstituents),
    predecessors: one(recipes, {
        fields: [recipes.predecessorId],
        references: [recipes.id],
    }),
    successors: many(recipes),
    tenant: one(tenants, {
        fields: [recipes.tenantId],
        references: [tenants.id],
    }),
}));

export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;
