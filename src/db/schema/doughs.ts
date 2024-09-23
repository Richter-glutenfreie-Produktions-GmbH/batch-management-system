import { pgTable, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";

export const doughs = pgTable("doughs", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => constituents.id, { onDelete: "cascade" }),
});

export type Dough = typeof doughs.$inferSelect;
export type NewDough = typeof doughs.$inferInsert;
