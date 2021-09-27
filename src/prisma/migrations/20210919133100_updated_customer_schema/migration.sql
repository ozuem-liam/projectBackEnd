/*
  Warnings:

  - You are about to drop the column `address` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "address",
ADD COLUMN     "is_delete" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
