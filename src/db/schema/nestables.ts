import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { bundles } from "./bundles";
import { packages } from "./packages";
import { palettes } from "./palettes";
import { sellingUnitHierarchies } from "./sellingUnitHierarchies";
import { tenants } from "./tenants";

export const nestables = pgTable("nestables_bt", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => bundles.id, { onDelete: "cascade", onUpdate: "cascade" }),
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

export const nestablesRelations = relations(nestables, ({ one, many }) => ({
    bundle: one(bundles, {
        fields: [nestables.id],
        references: [bundles.id],
    }),
    package: one(packages),
    palette: one(palettes),
    children: many(sellingUnitHierarchies),
    tenant: one(tenants, {
        fields: [nestables.tenantId],
        references: [tenants.id],
    }),
}));

export type Nestable = typeof nestables.$inferSelect;
export type NewNestable = typeof nestables.$inferInsert;
