import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedRecipeHasConstituents = pgTable("manufactured_recipe_has_constituents_jt", {
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

export const manufacturedRecipeHasConstituentsRelations = relations(
    manufacturedRecipeHasConstituents,
    ({ one, many }) => ({
        tenant: one(tenants, {
            fields: [manufacturedRecipeHasConstituents.tenantId],
            references: [tenants.id],
        }),
    }),
);

export type ManufacturedRecipeHasConstituent = typeof manufacturedRecipeHasConstituents.$inferSelect;
export type NewManufacturedRecipeHasConstituent = typeof manufacturedRecipeHasConstituents.$inferInsert;
