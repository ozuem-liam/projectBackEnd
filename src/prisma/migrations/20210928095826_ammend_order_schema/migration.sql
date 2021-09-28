/*
  Warnings:

  - You are about to drop the column `color` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_order_id_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "color";

-- DropTable
DROP TABLE "cart";
