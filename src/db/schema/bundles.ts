import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const bundles = pgTable("bundles_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
});

export type Bundle = typeof bundles.$inferSelect;
export type NewBundle = typeof bundles.$inferInsert;

export const bundlesRelations = relations(bundles, ({ many }) => ({}));
