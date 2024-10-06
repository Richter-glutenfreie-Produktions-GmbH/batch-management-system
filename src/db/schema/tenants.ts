import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { batches } from "./batches";
import { bundles } from "./bundles";
import { constituents } from "./constituents";
import { doughs } from "./doughs";
import { goods } from "./goods";
import { ingredients } from "./ingredients";
import { manufacturedBatches } from "./manufacturedBatches";
import { manufacturedBundles } from "./manufacturedBundles";
import { manufacturedConstituents } from "./manufacturedConstituents";
import { manufacturedDoughs } from "./manufacturedDoughs";
import { manufacturedGoods } from "./manufacturedGoods";
import { manufacturedNestables } from "./manufacturedNestables";
import { manufacturedPackageHierarchies } from "./manufacturedPackageHierarchies";
import { manufacturedPackages } from "./manufacturedPackages";
import { manufacturedPalettes } from "./manufacturedPalettes";
import { manufacturedProducts } from "./manufacturedProducts";
import { manufacturedRecipeHasConstituents } from "./manufacturedRecipeHasConstituents";
import { manufacturedRecipes } from "./manufacturedRecipes";
import { manufacturedSellingUnitHierarchies } from "./manufacturedSellingUnitHierarchies";
import { manufacturedSellingUnits } from "./manufacturedSellingUnits";
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
});

export const tenantsRelations = relations(tenants, ({ one, many }) => ({
    batches: many(batches),
    bundles: many(bundles),
    constituents: many(constituents),
    doughs: many(doughs),
    goods: many(goods),
    ingredients: many(ingredients),
    manufacturedBatches: many(manufacturedBatches),
    manufacturedBundles: many(manufacturedBundles),
    manufacturedConstituents: many(manufacturedConstituents),
    manufacturedDoughs: many(manufacturedDoughs),
    manufacturedGoods: many(manufacturedGoods),
    manufacturedNestables: many(manufacturedNestables),
    manufacturedPackageHierarchies: many(manufacturedPackageHierarchies),
    manufacturedPackages: many(manufacturedPackages),
    manufacturedPalettes: many(manufacturedPalettes),
    manufacturedProducts: many(manufacturedProducts),
    manufacturedRecipeHasConstituents: many(manufacturedRecipeHasConstituents),
    manufacturedRecipes: many(manufacturedRecipes),
    manufacturedSellingUnitHierarchies: many(manufacturedSellingUnitHierarchies),
    manufacturedSellingUnits: many(manufacturedSellingUnits),
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
