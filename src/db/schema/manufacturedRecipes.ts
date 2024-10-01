import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedRecipes = pgTable("manufactured_recipes", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
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
    tenant: one(tenants, {
        fields: [manufacturedRecipes.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedRecipe = typeof manufacturedRecipes.$inferSelect;
export type NewManufacturedRecipe = typeof manufacturedRecipes.$inferInsert;
