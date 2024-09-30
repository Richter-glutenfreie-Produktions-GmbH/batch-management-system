import { relations } from "drizzle-orm";
import { pgTable, text, unique, uuid } from "drizzle-orm/pg-core";

import { constituents } from "./constituents";
import { tenants } from "./tenants";

export const goods = pgTable(
    "goods",
    {
        id: uuid("id")
            .notNull()
            .primaryKey()
            .references(() => constituents.id, { onDelete: "cascade" }),
        number: text("number").notNull(),
        tenantId: uuid("tenant_id")
            .notNull()
            .references(() => tenants.id, { onDelete: "cascade" }),
    },
    (t) => ({
        unq: unique().on(t.tenantId, t.number),
    }),
);

export const goodsRelations = relations(goods, ({ one, many }) => ({
    constituent: one(constituents, {
        fields: [goods.id],
        references: [constituents.id],
    }),
    tenant: one(tenants, {
        fields: [goods.tenantId],
        references: [tenants.id],
    }),
}));

export type Good = typeof goods.$inferSelect;
export type NewGood = typeof goods.$inferInsert;