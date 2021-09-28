/*
  Warnings:

  - Changed the type of `sub_total` on the `order_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "sub_total",
ADD COLUMN     "sub_total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
