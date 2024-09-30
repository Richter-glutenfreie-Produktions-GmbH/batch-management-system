import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { tenants } from "./tenants";

export const ingredients = pgTable(
    "ingredients",
    {
        id: uuid("id")
            .notNull()
            .primaryKey()
            .references(() => constituents.id, { onDelete: "cascade" }),
        number: text("number").notNull(),
        name: text("name").notNull(),
        description: text("description"),
        isVegan: boolean("is_vegan").notNull().default(false),
        isVegetarian: boolean("is_vegetarian").notNull().default(false),
        isTurkishHalal: boolean("is_turkish_halal").notNull().default(true),
        isJewishKosher: boolean("is_jewish_kosher").notNull().default(true),
        tenantId: uuid("tenant_id")
            .notNull()
            .references(() => tenants.id, { onDelete: "cascade" }),
    },
    (t) => ({
        unq: unique().on(t.tenantId, t.number),
    }),
);

export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
    constituent: one(constituents, {
        fields: [ingredients.id],
        references: [constituents.id],
    }),
    tenant: one(tenants, {
        fields: [ingredients.tenantId],
        references: [tenants.id],
    }),
}));

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
