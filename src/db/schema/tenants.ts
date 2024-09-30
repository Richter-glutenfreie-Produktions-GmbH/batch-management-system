import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { batches } from "./batches";
import { bundles } from "./bundles";
import { constituents } from "./constituents";
import { doughs } from "./doughs";
import { goods } from "./goods";
import { ingredients } from "./ingredients";
import { manufacturedBatches } from "./manufacturedBatches";
import { nestables } from "./nestables";
import { packageHierarchies } from "./packageHierarchies";
import { packages } from "./packages";
import { palettes } from "./palettes";
import { products } from "./products";
import { rawMaterials } from "./rawMaterials";
import { receivedBatches } from "./receivedBatches";
import { recipeHasConstituents } from "./recipeHasConstituents";
import { recipes } from "./recipes";
import { sellingUnitHierarchies } from "./sellingUnitHierarchies";
import { sellingUnits } from "./sellingUnits";
import { settings } from "./settings";
import { unitConversions } from "./unitConversions";
import { units } from "./units";
import { users } from "./users";

export const tenants = pgTable("tenants", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name").notNull(),
});

export const tenantsRelations = relations(tenants, ({ one, many }) => ({
    batches: many(batches),
    bundles: many(bundles),
    constituents: many(constituents),
    doughs: many(doughs),
    goods: many(goods),
    ingredients: many(ingredients),
    manufacturedBatches: many(manufacturedBatches),
    nestables: many(nestables),
    packageHierarchies: many(packageHierarchies),
    packages: many(packages),
    palettes: many(palettes),
    products: many(products),
    rawMaterials: many(rawMaterials),
    receivedBatches: many(receivedBatches),
    recipeHasConstituents: many(recipeHasConstituents),
    recipes: many(recipes),
    sellingUnitHierarchies: many(sellingUnitHierarchies),
    sellingUnits: many(sellingUnits),
    settings: many(settings),
    unitConversions: many(unitConversions),
    units: many(units),
    users: many(users),
}));

export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
