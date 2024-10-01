import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";
import { users } from "./users";

export const settings = pgTable("settings", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    name: text("name").notNull(),
    value: text("value").notNull(),
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
    tenantId: uuid("tenant_id").references(() => tenants.id),
});

export const settingsRelations = relations(settings, ({ one }) => ({
    user: one(users, {
        fields: [settings.userId],
        references: [users.id],
    }),
    tenant: one(tenants, {
        fields: [settings.tenantId],
        references: [tenants.id],
    }),
}));

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;
