import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
