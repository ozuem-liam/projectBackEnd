/*
  Warnings:

  - You are about to drop the column `customer_id` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customer_id_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "customer_id";

-- CreateTable
CREATE TABLE "_CustomerToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToOrder_AB_unique" ON "_CustomerToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToOrder_B_index" ON "_CustomerToOrder"("B");

-- AddForeignKey
ALTER TABLE "_CustomerToOrder" ADD FOREIGN KEY ("A") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToOrder" ADD FOREIGN KEY ("B") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
