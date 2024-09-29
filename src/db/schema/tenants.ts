import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const tenants = pgTable("tenants", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name").notNull(),
});

export const tenantsRelations = relations(tenants, ({ one, many }) => ({
    // users: many(users), app_metadata manages the relation
}));

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
