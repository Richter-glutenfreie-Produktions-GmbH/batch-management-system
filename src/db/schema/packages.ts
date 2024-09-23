import { pgTable, uuid } from "drizzle-orm/pg-core";

import { bundles } from "./bundles";

export const packages = pgTable("packages", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => bundles.id, { onDelete: "cascade" }),
});
