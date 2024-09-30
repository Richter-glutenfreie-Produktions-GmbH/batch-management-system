import { relations } from "drizzle-orm";
import { AnyPgColumn, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { goods } from "./goods";
import { recipes } from "./recipes";
import { tenants } from "./tenants";

export const doughs = pgTable("doughs", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => goods.id, { onDelete: "cascade", onUpdate: "cascade" }),
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

export const doughsRelations = relations(doughs, ({ one }) => ({
    good: one(goods, {
        fields: [doughs.id],
        references: [goods.id],
    }),
    tenant: one(tenants, {
        fields: [doughs.tenantId],
        references: [tenants.id],
    }),
}));

export type Dough = typeof doughs.$inferSelect;
export type NewDough = typeof doughs.$inferInsert;
