/*
  Warnings:

  - You are about to drop the `_CustomerToOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CustomerToOrder" DROP CONSTRAINT "_CustomerToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToOrder" DROP CONSTRAINT "_CustomerToOrder_B_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "customerId" TEXT;

-- DropTable
DROP TABLE "_CustomerToOrder";

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
