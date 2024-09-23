import { integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const configurations = pgTable("configurations", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    version: integer("version").notNull(),
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
});

export type Configuration = typeof configurations.$inferSelect;
export type NewConfiguration = typeof configurations.$inferInsert;
