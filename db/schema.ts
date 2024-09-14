import {
    pgTable,
    text,
    boolean,
    integer,
    doublePrecision,
    timestamp,
    date,
    primaryKey,
    unique,
    uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const productBatches = pgTable("product_batches", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull(),
    batchId: uuid("batch_id").notNull(),
    recipeId: uuid("recipe_id").notNull(),
});

export const recipes = pgTable("recipes", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name"),
    productId: uuid("product_id").notNull(),
    isObsolete: boolean("is_obsolete").notNull(),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const configurations = pgTable("configurations", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    version: integer("version").notNull(),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const products = pgTable("products", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    currentRecipeId: uuid("current_recipe_id"),
    massValue: doublePrecision("mass_value").notNull(),
    massUnitId: uuid("mass_unit_id").notNull(),
    isActive: boolean("is_active").notNull(),
});

export const customers = pgTable("customers", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
});

export const rawMaterials = pgTable("raw_materials", {
    supplyItemId: uuid("supply_item_id").notNull().primaryKey(),
    receivedBatchesId: uuid("received_batches_id").notNull(),
    number: text("number").notNull().unique(),
    overrideIsVegan: boolean("override_is_vegan"),
    overrideIsVegetarian: boolean("override_is_vegetarian"),
    overrideIsTurkishHalal: boolean("override_is_turkish_halal"),
    overrideIsJewishKosher: boolean("override_is_jewish_kosher"),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const ingredientsBt = pgTable("ingredients_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    number: text("number").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const manufacturedBatches = pgTable("manufactured_batches", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    manufacturedOn: date("manufactured_on").notNull(),
});

export const batchesBt = pgTable("batches_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    number: text("number").notNull(),
    expiresOn: date("expires_on").notNull(),
    note: text("note"),
    massValue: doublePrecision("mass_value").notNull(),
    massUnitId: uuid("mass_unit_id").notNull(),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const receivedBatches = pgTable("received_batches", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    deliveredOn: date("delivered_on").notNull(),
});

export const units = pgTable("units", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    symbol: text("symbol").notNull(),
    label: text("label").notNull(),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const recipeHasIngredientsJt = pgTable(
    "recipe_has_ingredients_jt",
    {
        ingredientId: uuid("ingredient_id").notNull(),
        recipeId: uuid("recipe_id").notNull(),
        amountValue: integer("amount_value").notNull(),
        amountUnitId: uuid("amount_unit_id").notNull(),
        insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        pk: primaryKey(table.ingredientId, table.recipeId),
    })
);

export const supplyItem = pgTable("supply_item", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    isVegan: boolean("is_vegan").notNull().default(false),
    isVegetarian: boolean("is_vegetarian").notNull().default(false),
    isTurkishHalal: boolean("is_turkish_halal").notNull().default(true),
    isJewishKosher: boolean("is_jewish_kosher").notNull().default(true),
});

export const unitConversions = pgTable(
    "unit_conversions",
    {
        fromUnitId: uuid("from_unit_id").notNull(),
        toUnitId: uuid("to_unit_id").notNull(),
        conversionFactor: doublePrecision("conversion_factor").notNull(),
        description: text("description"),
        insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "date", precision: 3 })
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        pk: primaryKey(table.fromUnitId, table.toUnitId),
    })
);

// Add foreign key relations
export const relationsSetup = relations(
    [
        recipes,
        productBatches,
        rawMaterials,
        ingredientsBt,
        manufacturedBatches,
        batchesBt,
        receivedBatches,
        units,
        recipeHasIngredientsJt,
        supplyItem,
        unitConversions,
    ],
    (table) => ({
        recipesRelations: {
            product: table.foreignKey(recipes.productId).references(products.id),
            currentRecipe: table.foreignKey(products.currentRecipeId).references(recipes.id),
        },
        productBatchesRelations: {
            product: table.foreignKey(productBatches.productId).references(products.id),
            batch: table.foreignKey(productBatches.batchId).references(manufacturedBatches.id),
            recipe: table.foreignKey(productBatches.recipeId).references(recipes.id),
        },
        rawMaterialsRelations: {
            supplyItem: table.foreignKey(rawMaterials.supplyItemId).references(supplyItem.id),
            receivedBatch: table
                .foreignKey(rawMaterials.receivedBatchesId)
                .references(receivedBatches.id),
        },
        recipeHasIngredientsJtRelations: {
            ingredient: table
                .foreignKey(recipeHasIngredientsJt.ingredientId)
                .references(ingredientsBt.id),
            recipe: table.foreignKey(recipeHasIngredientsJt.recipeId).references(recipes.id),
            unit: table.foreignKey(recipeHasIngredientsJt.amountUnitId).references(units.id),
        },
        manufacturedBatchesRelations: {
            batch: table.foreignKey(manufacturedBatches.id).references(batchesBt.id),
        },
        batchesBtRelations: {
            unit: table.foreignKey(batchesBt.massUnitId).references(units.id),
        },
        unitConversionsRelations: {
            fromUnit: table.foreignKey(unitConversions.fromUnitId).references(units.id),
            toUnit: table.foreignKey(unitConversions.toUnitId).references(units.id),
        },
    })
);
