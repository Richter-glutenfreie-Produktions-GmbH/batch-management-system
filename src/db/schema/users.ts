import { relations } from "drizzle-orm";
import { pgSchema, pgTable, uuid } from "drizzle-orm/pg-core";

import { settings } from "./settings";

const authSchema = pgSchema("auth");

const authUsers = authSchema.table("users", {
    id: uuid("id").primaryKey(),
});

export const users = pgTable("users", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => authUsers.id),
});

export const usersRelations = relations(users, ({ one, many }) => ({
    user: one(authUsers, {
        fields: [users.id],
        references: [authUsers.id],
    }),
    settings: many(settings),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
