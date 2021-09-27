/*
  Warnings:

  - You are about to drop the `_Order_itemsToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `color` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_details` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Order_itemsToProduct" DROP CONSTRAINT "_Order_itemsToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_Order_itemsToProduct" DROP CONSTRAINT "_Order_itemsToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "product_details" TEXT NOT NULL,
ADD COLUMN     "product_id" TEXT NOT NULL,
ALTER COLUMN "sub_total" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "price" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_Order_itemsToProduct";

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
