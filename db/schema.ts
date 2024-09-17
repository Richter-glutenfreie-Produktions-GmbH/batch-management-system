import {
    pgTable,
    text,
    boolean,
    integer,
    doublePrecision,
    timestamp,
    date,
    primaryKey,
    uuid,
    AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const productBatches = pgTable("product_batches", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    batchId: uuid("batch_id")
        .notNull()
        .references(() => manufacturedBatches.id, { onDelete: "cascade" }),
    recipeId: uuid("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
});

export type ProductBatch = typeof productBatches.$inferSelect;
export type NewProductBatch = typeof productBatches.$inferInsert;

export const productBatchesRelations = relations(productBatches, ({ one }) => ({
    product: one(products, {
        fields: [productBatches.productId],
        references: [products.id],
    }),
    batch: one(batches, {
        fields: [productBatches.batchId],
        references: [batches.id],
    }),
    recipe: one(recipes, {
        fields: [productBatches.recipeId],
        references: [recipes.id],
    }),
}));

export const recipes = pgTable("recipes", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name"),
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    isObsolete: boolean("is_obsolete").notNull().default(false),
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

export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;

export const recipesRelations = relations(recipes, ({ one, many }) => ({
    product: one(products, {
        fields: [recipes.productId],
        references: [products.id],
    }),
    productBatches: many(productBatches),
    recipeHasIngredients: many(recipeHasIngredients),
}));

export const configurations = pgTable("configurations", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    version: integer("version").notNull(),
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

export type Configuration = typeof configurations.$inferSelect;
export type NewConfiguration = typeof configurations.$inferInsert;

export const products = pgTable("products", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => ingredients.id, { onDelete: "cascade" }),
    currentRecipeId: uuid("current_recipe_id").references((): AnyPgColumn => recipes.id),
    massValue: doublePrecision("mass_value").notNull(),
    massUnitId: uuid("mass_unit_id").notNull(),
    isActive: boolean("is_active").notNull().default(true),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const productsRelations = relations(products, ({ one, many }) => ({
    ingredient: one(ingredients, {
        fields: [products.id],
        references: [ingredients.id],
    }),
    recipes: many(recipes),
    currentRecipe: one(recipes, {
        fields: [products.currentRecipeId],
        references: [recipes.id],
    }),
    productBatches: many(productBatches),
}));

export const customers = pgTable("customers", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;

export const rawMaterials = pgTable("raw_materials", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    supplyItemId: uuid("supply_item_id")
        .notNull()
        .references(() => supplyItems.id, { onDelete: "cascade" }),
    receivedBatchesId: uuid("received_batches_id")
        .notNull()
        .references(() => receivedBatches.id, { onDelete: "cascade" }),
    number: text("number").notNull().unique(),
    overrideIsVegan: boolean("override_is_vegan"),
    overrideIsVegetarian: boolean("override_is_vegetarian"),
    overrideIsTurkishHalal: boolean("override_is_turkish_halal"),
    overrideIsJewishKosher: boolean("override_is_jewish_kosher"),
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

export type RawMaterial = typeof rawMaterials.$inferSelect;
export type NewRawMaterial = typeof rawMaterials.$inferInsert;

export const rawMaterialsRelations = relations(rawMaterials, ({ one }) => ({
    supplyItem: one(supplyItems, {
        fields: [rawMaterials.supplyItemId],
        references: [supplyItems.id],
    }),
    receivedBatch: one(receivedBatches, {
        fields: [rawMaterials.receivedBatchesId],
        references: [receivedBatches.id],
    }),
}));

export const ingredients = pgTable("ingredients_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    number: text("number").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),
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

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
    recipeHasIngredients: many(recipeHasIngredients),
}));

export const manufacturedBatches = pgTable("manufactured_batches", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => batches.id, { onDelete: "cascade" }),
    manufacturedOn: date("manufactured_on").notNull().defaultNow(),
});

export type ManufacturedBatch = typeof manufacturedBatches.$inferSelect;
export type NewManufacturedBatch = typeof manufacturedBatches.$inferInsert;

export const manufacturedBatchesRelations = relations(manufacturedBatches, ({ one, many }) => ({
    batch: one(batches, {
        fields: [manufacturedBatches.id],
        references: [batches.id],
    }),
    productBatches: many(productBatches),
}));

export const batches = pgTable("batches_bt", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    number: text("number").notNull(),
    expiresOn: date("expires_on")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP + INTERVAL '1 year'`),
    note: text("note"),
    massValue: doublePrecision("mass_value").notNull(),
    massUnitId: uuid("mass_unit_id")
        .notNull()
        .references(() => units.id, { onDelete: "cascade" }),
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

export type Batch = typeof batches.$inferSelect;
export type NewBatch = typeof batches.$inferInsert;

export const batchesRelations = relations(batches, ({ one, many }) => ({
    massUnit: one(units, {
        fields: [batches.massUnitId],
        references: [units.id],
    }),
}));

export const receivedBatches = pgTable("received_batches", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => batches.id, { onDelete: "cascade" }),
    deliveredOn: date("delivered_on").notNull().defaultNow(),
});

export type ReceivedBatch = typeof receivedBatches.$inferSelect;
export type NewReceivedBatch = typeof receivedBatches.$inferInsert;

export const receivedBatchesRelations = relations(receivedBatches, ({ one, many }) => ({
    batch: one(batches, {
        fields: [receivedBatches.id],
        references: [batches.id],
    }),
    rawMaterials: many(rawMaterials),
}));

export const units = pgTable("units", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    symbol: text("symbol").notNull(),
    label: text("label").notNull(),
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

export type Unit = typeof units.$inferSelect;
export type NewUnit = typeof units.$inferInsert;

export const unitsRelations = relations(units, ({ many }) => ({
    fromUnits: many(unitConversions, { relationName: "fromUnit" }),
    toUnits: many(unitConversions, { relationName: "toUnit" }),
    recipeHasIngredients: many(recipeHasIngredients),
    batches: many(batches),
}));

export const recipeHasIngredients = pgTable(
    "recipe_has_ingredients_jt",
    {
        ingredientId: uuid("ingredient_id")
            .notNull()
            .references(() => ingredients.id, { onDelete: "cascade" }),
        recipeId: uuid("recipe_id")
            .notNull()
            .references(() => recipes.id, { onDelete: "cascade" }),
        amountValue: integer("amount_value").notNull(),
        amountUnitId: uuid("amount_unit_id")
            .notNull()
            .references(() => units.id, { onDelete: "cascade" }),
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
    },
    (table) => ({
        pk: primaryKey(table.ingredientId, table.recipeId),
    })
);

export type RecipeHasIngredient = typeof recipeHasIngredients.$inferSelect;
export type NewRecipeHasIngredient = typeof recipeHasIngredients.$inferInsert;

export const recipeHasIngredientsRelations = relations(recipeHasIngredients, ({ one }) => ({
    ingredient: one(ingredients, {
        fields: [recipeHasIngredients.ingredientId],
        references: [ingredients.id],
    }),
    recipe: one(recipes, {
        fields: [recipeHasIngredients.recipeId],
        references: [recipes.id],
    }),
    amountUnit: one(units, {
        fields: [recipeHasIngredients.amountUnitId],
        references: [units.id],
    }),
}));

export const supplyItems = pgTable("supply_items", {
    id: uuid("id")
        .notNull()
        .primaryKey()
        .references(() => ingredients.id, { onDelete: "cascade" }),
    isVegan: boolean("is_vegan").notNull().default(false),
    isVegetarian: boolean("is_vegetarian").notNull().default(false),
    isTurkishHalal: boolean("is_turkish_halal").notNull().default(true),
    isJewishKosher: boolean("is_jewish_kosher").notNull().default(true),
});

export type SupplyItem = typeof supplyItems.$inferSelect;
export type NewSupplyItem = typeof supplyItems.$inferInsert;

export const supplyItemsRelations = relations(supplyItems, ({ one, many }) => ({
    ingredient: one(ingredients, {
        fields: [supplyItems.id],
        references: [ingredients.id],
    }),
    rawMaterials: many(rawMaterials),
}));

export const unitConversions = pgTable(
    "unit_conversions",
    {
        fromUnitId: uuid("from_unit_id")
            .notNull()
            .references(() => units.id, { onDelete: "cascade" }),
        toUnitId: uuid("to_unit_id")
            .notNull()
            .references(() => units.id, { onDelete: "cascade" }),
        conversionFactor: doublePrecision("conversion_factor").notNull(),
        description: text("description"),
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
    },
    (table) => ({
        pk: primaryKey(table.fromUnitId, table.toUnitId),
    })
);

export type UnitConversion = typeof unitConversions.$inferSelect;
export type NewUnitConversion = typeof unitConversions.$inferInsert;

export const unitConversionsRelations = relations(unitConversions, ({ one }) => ({
    fromUnit: one(units, {
        fields: [unitConversions.fromUnitId],
        references: [units.id],
        relationName: "fromUnit",
    }),
    toUnit: one(units, {
        fields: [unitConversions.toUnitId],
        references: [units.id],
        relationName: "toUnit",
    }),
}));
