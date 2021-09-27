/*
  Warnings:

  - You are about to drop the `CategoriesOnProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductsOnOrderItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnProducts" DROP CONSTRAINT "CategoriesOnProducts_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrderItems" DROP CONSTRAINT "ProductsOnOrderItems_order_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnOrderItems" DROP CONSTRAINT "ProductsOnOrderItems_product_id_fkey";

-- DropTable
DROP TABLE "CategoriesOnProducts";

-- DropTable
DROP TABLE "ProductsOnOrderItems";

-- CreateTable
CREATE TABLE "_Order_itemsToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Order_itemsToProduct_AB_unique" ON "_Order_itemsToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_Order_itemsToProduct_B_index" ON "_Order_itemsToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- AddForeignKey
ALTER TABLE "_Order_itemsToProduct" ADD FOREIGN KEY ("A") REFERENCES "order_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Order_itemsToProduct" ADD FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
