import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

import { ingredients } from "./ingredients";
import { receivedBatches } from "./receivedBatches";
import { tenants } from "./tenants";

export const rawMaterials = pgTable(
    "raw_materials",
    {
        id: uuid("id").notNull().primaryKey().defaultRandom(),
        ingredientId: uuid("ingredient_id")
            .notNull()
            .references(() => ingredients.id, { onDelete: "cascade" }),
        batchId: uuid("received_batches_id")
            .notNull()
            .references(() => receivedBatches.id, { onDelete: "cascade" }),
        number: text("number").notNull(),
        overrideIsVegan: boolean("override_is_vegan"),
        overrideIsVegetarian: boolean("override_is_vegetarian"),
        overrideIsTurkishHalal: boolean("override_is_turkish_halal"),
        overrideIsJewishKosher: boolean("override_is_jewish_kosher"),
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
            .references(() => tenants.id, { onDelete: "cascade" }),
    },
    (t) => ({
        unq: unique().on(t.tenantId, t.number),
    }),
);

export const rawMaterialsRelations = relations(rawMaterials, ({ one }) => ({
    ingredient: one(ingredients, {
        fields: [rawMaterials.ingredientId],
        references: [ingredients.id],
    }),
    batch: one(receivedBatches, {
        fields: [rawMaterials.batchId],
        references: [receivedBatches.id],
    }),
    tenant: one(tenants, {
        fields: [rawMaterials.tenantId],
        references: [tenants.id],
    }),
}));

export type RawMaterial = typeof rawMaterials.$inferSelect;
export type NewRawMaterial = typeof rawMaterials.$inferInsert;
