import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { users } from "./users";

export const settings = pgTable("settings", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    value: text("value").notNull(),
});

export const settingsRelations = relations(settings, ({ one }) => ({
    user: one(users, {
        fields: [settings.userId],
        references: [users.id],
    }),
}));

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;
