import { pgTable, uuid } from "drizzle-orm/pg-core";

export const bundles = pgTable("bundles_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
});
