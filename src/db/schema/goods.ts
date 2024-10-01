import { relations } from "drizzle-orm";
import { AnyPgColumn, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { recipes } from "./recipes";
import { tenants } from "./tenants";

export const goods = pgTable(
    "goods_bt",
    {
        id: uuid("id")
            .notNull()
            .primaryKey()
            .references(() => constituents.id, { onDelete: "cascade", onUpdate: "cascade" }),
        currentRecipeId: uuid("current_recipe_id").references((): AnyPgColumn => recipes.id),
        number: text("number").notNull(),
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
    },
    (t) => ({
        unq: unique().on(t.tenantId, t.number),
    }),
);

export const goodsRelations = relations(goods, ({ one, many }) => ({
    constituent: one(constituents, {
        fields: [goods.id],
        references: [constituents.id],
    }),
    currentRecipe: one(recipes, {
        fields: [goods.currentRecipeId],
        references: [recipes.id],
    }),
    recipes: many(recipes),
    tenant: one(tenants, {
        fields: [goods.tenantId],
        references: [tenants.id],
    }),
}));

export type Good = typeof goods.$inferSelect;
export type NewGood = typeof goods.$inferInsert;
