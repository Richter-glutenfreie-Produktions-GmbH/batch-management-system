import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";

import { packages } from "./packages";
import { palettes } from "./palettes";
import { tenants } from "./tenants";

export const packageHierarchies = pgTable("package_hierarchies", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => packages.id, { onDelete: "cascade" }),
    parentId: uuid("parent_id")
        .notNull()
        .references(() => palettes.id, { onDelete: "cascade" }),
    tenantId: uuid("tenant_id")
        .notNull()
        .references(() => tenants.id, { onDelete: "cascade" }),
});

export const packageHierarchiesRelations = relations(packageHierarchies, ({ one, many }) => ({
    package: one(packages, {
        fields: [packageHierarchies.id],
        references: [packages.id],
    }),
    parent: one(palettes, {
        fields: [packageHierarchies.parentId],
        references: [palettes.id],
    }),
    tenant: one(tenants, {
        fields: [packageHierarchies.tenantId],
        references: [tenants.id],
    }),
}));

export type PackageHierarchy = typeof packageHierarchies.$inferSelect;
export type NewPackageHierarchy = typeof packageHierarchies.$inferInsert;
