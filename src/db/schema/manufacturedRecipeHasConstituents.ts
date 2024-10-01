import { relations } from "drizzle-orm";
import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";
import { manufacturedConstituents } from "./manufacturedConstituents";
import { manufacturedRecipes } from "./manufacturedRecipes";

export const manufacturedRecipeHasConstituents = pgTable("manufactured_recipe_has_constituents_jt", 
    {    
        manufacturedConstituentId: uuid("manufactured_constituent_id")
            .notNull()
            .references(() => manufacturedConstituents.id, { onDelete: "cascade", onUpdate: "cascade" }),
        manufacturedRecipeId: uuid("manufactured_recipe_id")
            .notNull()
            .references(() => manufacturedRecipes.id, { onDelete: "cascade", onUpdate: "cascade" }),
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
    (table) => ({
        pk: primaryKey(table.manufacturedConstituentId, table.manufacturedRecipeId),
    }),
);

export const manufacturedRecipeHasConstituentsRelations = relations(
    manufacturedRecipeHasConstituents,
    ({ one, many }) => ({
        manufacturedConstituent: one(manufacturedConstituents, {
            fields: [manufacturedRecipeHasConstituents.manufacturedConstituentId],
            references: [manufacturedConstituents.id]
        }),
        manufacturedRecipe: one(manufacturedRecipes, {
            fields: [manufacturedRecipeHasConstituents.manufacturedRecipeId],
            references: [manufacturedRecipes.id]
        }),
        tenant: one(tenants, {
            fields: [manufacturedRecipeHasConstituents.tenantId],
            references: [tenants.id],
        }),
    }),
);

export type ManufacturedRecipeHasConstituent = typeof manufacturedRecipeHasConstituents.$inferSelect;
export type NewManufacturedRecipeHasConstituent = typeof manufacturedRecipeHasConstituents.$inferInsert;
