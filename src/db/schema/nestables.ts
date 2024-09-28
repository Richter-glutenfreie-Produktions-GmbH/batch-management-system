import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { bundles } from "./bundles";
import { packages } from "./packages";
import { palettes } from "./palettes";
import { sellingUnitHierarchies } from "./sellingUnitHierarchies";

export const nestables = pgTable("nestables_bt", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => bundles.id, { onDelete: "cascade" }),
});

export const nestablesRelations = relations(nestables, ({ one, many }) => ({
    bundle: one(bundles, {
        fields: [nestables.id],
        references: [bundles.id],
    }),
    package: one(packages),
    palette: one(palettes),
    children: many(sellingUnitHierarchies),
}));

export type Nestable = typeof nestables.$inferSelect;
export type NewNestable = typeof nestables.$inferInsert;
