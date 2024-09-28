import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { packageHierarchies } from "./packageHierarchies";

export const palettes = pgTable("palettes", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => nestables.id, { onDelete: "cascade" }),
});

export const palettesRelations = relations(palettes, ({ one, many }) => ({
    nestable: one(nestables, {
        fields: [palettes.id],
        references: [nestables.id],
    }),
    children: many(packageHierarchies),
}));

export type Palette = typeof palettes.$inferSelect;
export type NewPalette = typeof palettes.$inferInsert;
