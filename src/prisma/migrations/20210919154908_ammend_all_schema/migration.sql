/*
  Warnings:

  - You are about to drop the column `customerId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `dispatcherId` on the `locations` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dispatcher_id` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_customerId_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_customerId_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_dispatcherId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "customerId",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "customerId",
ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "dispatcherId",
ADD COLUMN     "dispatcher_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_dispatcher_id_fkey" FOREIGN KEY ("dispatcher_id") REFERENCES "dispatcher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
