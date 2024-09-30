import { relations } from "drizzle-orm";
import { pgSchema, pgTable, uuid } from "drizzle-orm/pg-core";

import { settings } from "./settings";
import { tenants } from "./tenants";

const authSchema = pgSchema("auth");

const authUsers = authSchema.table("users", {
    id: uuid("id").primaryKey(),
});

export const users = pgTable("users", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => authUsers.id),
    tenantId: uuid("tenant_id")
        .notNull()
        .references(() => tenants.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(users, ({ one, many }) => ({
    user: one(authUsers, {
        fields: [users.id],
        references: [authUsers.id],
    }),
    settings: many(settings),
    tenant: one(tenants, {
        fields: [users.tenantId],
        references: [tenants.id],
    }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
