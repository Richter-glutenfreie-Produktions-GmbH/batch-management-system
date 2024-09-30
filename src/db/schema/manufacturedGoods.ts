import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { tenants } from "./tenants";

export const manufacturedGoods = pgTable("manufactured_goods_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
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
        .references(() => tenants.id, { onDelete: "cascade" }),
});

export const manufacturedGoodsRelations = relations(manufacturedGoods, ({ one, many }) => ({
    tenant: one(tenants, {
        fields: [manufacturedGoods.tenantId],
        references: [tenants.id],
    }),
}));

export type ManufacturedGood = typeof manufacturedGoods.$inferSelect;
export type NewManufacturedGood = typeof manufacturedGoods.$inferInsert;
