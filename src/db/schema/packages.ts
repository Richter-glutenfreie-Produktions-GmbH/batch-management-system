import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";

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
}));

export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
