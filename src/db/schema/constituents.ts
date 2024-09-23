import { pgTable, uuid } from "drizzle-orm/pg-core";

export const constituents = pgTable("constituents_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
});