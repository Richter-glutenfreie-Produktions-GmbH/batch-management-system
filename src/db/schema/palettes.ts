import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { nestables } from "./nestables";
import { packageHierarchies } from "./packageHierarchies";
import { tenants } from "./tenants";

export const palettes = pgTable("palettes", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => nestables.id, { onDelete: "cascade", onUpdate: "cascade" }),
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
    tenantId: uuid("tenant_id")
        .notNull()
        .references(() => tenants.id),
});

export const palettesRelations = relations(palettes, ({ one, many }) => ({
    nestable: one(nestables, {
        fields: [palettes.id],
        references: [nestables.id],
    }),
    children: many(packageHierarchies),
    tenant: one(tenants, {
        fields: [palettes.tenantId],
        references: [tenants.id],
    }),
}));

export type Palette = typeof palettes.$inferSelect;
export type NewPalette = typeof palettes.$inferInsert;
