import { relations } from "drizzle-orm";
import { boolean, pgTable, uuid } from "drizzle-orm/pg-core";

import { ingredients } from "./ingredients";
import { rawMaterials } from "./rawMaterials";

export const supplyItems = pgTable("supply_items", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => ingredients.id, { onDelete: "cascade" }),
    isVegan: boolean("is_vegan").notNull().default(false),
    isVegetarian: boolean("is_vegetarian").notNull().default(false),
    isTurkishHalal: boolean("is_turkish_halal").notNull().default(true),
    isJewishKosher: boolean("is_jewish_kosher").notNull().default(true),
});

export type SupplyItem = typeof supplyItems.$inferSelect;
export type NewSupplyItem = typeof supplyItems.$inferInsert;

export const supplyItemsRelations = relations(supplyItems, ({ one, many }) => ({
    ingredient: one(ingredients, {
        fields: [supplyItems.id],
        references: [ingredients.id],
    }),
    rawMaterials: many(rawMaterials),
}));
