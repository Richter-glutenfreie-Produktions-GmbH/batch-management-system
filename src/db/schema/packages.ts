import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { packageHierarchies } from "./packageHierarchies";

export const packages = pgTable("packages", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => nestables.id, { onDelete: "cascade" }),
});

export const packagesRelations = relations(packages, ({ one, many }) => ({
    nestable: one(nestables, {
        fields: [packages.id],
        references: [nestables.id],
    }),
    hierarchy: one(packageHierarchies),
}));

export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
