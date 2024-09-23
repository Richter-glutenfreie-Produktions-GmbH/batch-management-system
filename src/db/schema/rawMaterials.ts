import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { receivedBatches } from "./receivedBatches";
import { supplyItems } from "./supplyItems";

export const rawMaterials = pgTable("raw_materials", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    supplyItemId: uuid("supply_item_id")
        .notNull()
        .references(() => supplyItems.id, { onDelete: "cascade" }),
    receivedBatchesId: uuid("received_batches_id")
        .notNull()
        .references(() => receivedBatches.id, { onDelete: "cascade" }),
    number: text("number").notNull().unique(),
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
});

export const rawMaterialsRelations = relations(rawMaterials, ({ one }) => ({
    supplyItem: one(supplyItems, {
        fields: [rawMaterials.supplyItemId],
        references: [supplyItems.id],
    }),
    receivedBatch: one(receivedBatches, {
        fields: [rawMaterials.receivedBatchesId],
        references: [receivedBatches.id],
    }),
}));

export type RawMaterial = typeof rawMaterials.$inferSelect;
export type NewRawMaterial = typeof rawMaterials.$inferInsert;
