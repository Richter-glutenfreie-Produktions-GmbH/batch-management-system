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
    AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const productBatch = pgTable("product_batches", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    productId: uuid("product_id")
        .notNull()
        .references(() => product.id, { onDelete: "cascade" }),
    batchId: uuid("batch_id")
        .notNull()
        .references(() => batch.id, { onDelete: "cascade" }),
    recipeId: uuid("recipe_id")
        .notNull()
        .references(() => recipe.id, { onDelete: "cascade" }),
});

export const productBatchRelations = relations(productBatch, ({ one }) => ({
    product: one(product, {
        fields: [productBatch.productId],
        references: [product.id],
    }),
    batch: one(batch, {
        fields: [productBatch.batchId],
        references: [batch.id],
    }),
    recipe: one(recipe, {
        fields: [productBatch.recipeId],
        references: [recipe.id],
    }),
}));

export const recipe = pgTable("recipes", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name"),
    productId: uuid("product_id")
        .notNull()
        .references(() => product.id, { onDelete: "cascade" }),
    isObsolete: boolean("is_obsolete").notNull(),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const recipeRelations = relations(recipe, ({ one, many }) => ({
    product: one(product, {
        fields: [recipe.productId],
        references: [product.id],
    }),
    productBatches: many(productBatch),
    recipeHasIngredients: many(recipeHasIngredient),
}));

export const configuration = pgTable("configurations", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    version: integer("version").notNull(),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const product = pgTable("products", {
    id: uuid("id").notNull().primaryKey().defaultRandom(), // todo: is from base table ingredient
    currentRecipeId: uuid("current_recipe_id").references((): AnyPgColumn => recipe.id),
    massValue: doublePrecision("mass_value").notNull(),
    massUnitId: uuid("mass_unit_id").notNull(),
    isActive: boolean("is_active").notNull(),
});

export const productRelations = relations(product, ({ one, many }) => ({
    recipes: many(recipe),
    currentRecipe: one(recipe, {
        fields: [product.currentRecipeId],
        references: [recipe.id],
    }),
    productBatches: many(productBatch),
}));

export const customer = pgTable("customers", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
});

export const rawMaterial = pgTable("raw_materials", {
    supplyItemId: uuid("supply_item_id").notNull().primaryKey(),
    receivedBatchesId: uuid("received_batches_id")
        .notNull()
        .references(() => receivedBatch.id, { onDelete: "cascade" }),
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

export const rawMaterialRelations = relations(rawMaterial, ({ one }) => ({
    supplyItem: one(supplyItem, {
        fields: [rawMaterial.supplyItemId],
        references: [supplyItem.id],
    }),
    receivedBatch: one(receivedBatch, {
        fields: [rawMaterial.receivedBatchesId],
        references: [receivedBatch.id],
    }),
}));

export const ingredient = pgTable("ingredients_bt", {
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

export const ingredientRelations = relations(ingredient, ({ many }) => ({
    recipeHasIngredients: many(recipeHasIngredient),
}));

export const manufacturedBatch = pgTable("manufactured_batches", {
    id: uuid("id").notNull().primaryKey().defaultRandom(), // todo: is from base table batch
    manufacturedOn: date("manufactured_on").notNull(),
});

export const batch = pgTable("batches_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    number: text("number").notNull(),
    expiresOn: date("expires_on").notNull(),
    note: text("note"),
    massValue: doublePrecision("mass_value").notNull(),
    massUnitId: uuid("mass_unit_id")
        .notNull()
        .references(() => unit.id, { onDelete: "cascade" }),
    insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
        .notNull()
        .$onUpdate(() => new Date()),
});

export const batchRelations = relations(batch, ({ one, many }) => ({
    productBatches: many(productBatch),
    massUnit: one(unit, {
        fields: [batch.massUnitId],
        references: [unit.id],
    }),
}));

export const receivedBatch = pgTable("received_batches", {
    id: uuid("id").notNull().primaryKey().defaultRandom(), // todo: is from base table batch
    deliveredOn: date("delivered_on").notNull(),
});

export const receivedBatchRelations = relations(receivedBatch, ({ many }) => ({
    rawMaterials: many(rawMaterial),
}));

export const unit = pgTable("units", {
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

export const unitRelations = relations(unit, ({ many }) => ({
    fromUnits: many(unitConversion, { relationName: "fromUnit" }),
    toUnits: many(unitConversion, { relationName: "toUnit" }),
    recipeHasIngredients: many(recipeHasIngredient),
    batches: many(batch),
}));

export const recipeHasIngredient = pgTable(
    "recipe_has_ingredients_jt",
    {
        ingredientId: uuid("ingredient_id")
            .notNull()
            .references(() => ingredient.id, { onDelete: "cascade" }),
        recipeId: uuid("recipe_id")
            .notNull()
            .references(() => recipe.id, { onDelete: "cascade" }),
        amountValue: integer("amount_value").notNull(),
        amountUnitId: uuid("amount_unit_id")
            .notNull()
            .references(() => unit.id, { onDelete: "cascade" }),
        insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        pk: primaryKey(table.ingredientId, table.recipeId),
    })
);

export const recipeHasIngredientRelations = relations(recipeHasIngredient, ({ one }) => ({
    ingredient: one(ingredient, {
        fields: [recipeHasIngredient.ingredientId],
        references: [ingredient.id],
    }),
    recipe: one(recipe, {
        fields: [recipeHasIngredient.recipeId],
        references: [recipe.id],
    }),
    amountUnit: one(unit, {
        fields: [recipeHasIngredient.amountUnitId],
        references: [unit.id],
    }),
}));

export const supplyItem = pgTable("supply_items", {
    id: uuid("id").notNull().primaryKey().defaultRandom(), // todo: is from base table ingredient
    isVegan: boolean("is_vegan").notNull().default(false),
    isVegetarian: boolean("is_vegetarian").notNull().default(false),
    isTurkishHalal: boolean("is_turkish_halal").notNull().default(true),
    isJewishKosher: boolean("is_jewish_kosher").notNull().default(true),
});

export const supplyItemRelations = relations(supplyItem, ({ many }) => ({
    rawMaterials: many(rawMaterial),
    // ingredients: many(ingredient),
    // rawMaterials: many(rawMaterial),
}));

export const unitConversion = pgTable(
    "unit_conversions",
    {
        fromUnitId: uuid("from_unit_id")
            .notNull()
            .references(() => unit.id, { onDelete: "cascade" }),
        toUnitId: uuid("to_unit_id")
            .notNull()
            .references(() => unit.id, { onDelete: "cascade" }),
        conversionFactor: doublePrecision("conversion_factor").notNull(),
        description: text("description"),
        insertedAt: timestamp("inserted_at", { mode: "date", precision: 3, withTimezone: false })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp("updated_at", { mode: "date", precision: 3, withTimezone: false })
            .notNull()
            .$onUpdate(() => new Date()),
    },
    (table) => ({
        pk: primaryKey(table.fromUnitId, table.toUnitId),
    })
);

export const unitConversionRelations = relations(unitConversion, ({ one }) => ({
    fromUnit: one(unit, {
        fields: [unitConversion.fromUnitId],
        references: [unit.id],
        relationName: "fromUnit",
    }),
    toUnit: one(unit, {
        fields: [unitConversion.toUnitId],
        references: [unit.id],
        relationName: "toUnit",
    }),
}));
