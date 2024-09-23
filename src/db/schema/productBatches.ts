// export const productBatches = pgTable("product_batches", {
//     id: uuid("id").notNull().primaryKey().defaultRandom(),
//     productId: uuid("product_id")
//         .notNull()
//         .references(() => products.id, { onDelete: "cascade" }),
//     batchId: uuid("batch_id")
//         .notNull()
//         .references(() => manufacturedBatches.id, { onDelete: "cascade" }),
//     recipeId: uuid("recipe_id")
//         .notNull()
//         .references(() => recipes.id, { onDelete: "cascade" }),
// });

// export type ProductBatch = typeof productBatches.$inferSelect;
// export type NewProductBatch = typeof productBatches.$inferInsert;

// export const productBatchesRelations = relations(productBatches, ({ one }) => ({
//     product: one(products, {
//         fields: [productBatches.productId],
//         references: [products.id],
//     }),
//     batch: one(batches, {
//         fields: [productBatches.batchId],
//         references: [batches.id],
//     }),
//     recipe: one(recipes, {
//         fields: [productBatches.recipeId],
//         references: [recipes.id],
//     }),
// }));
