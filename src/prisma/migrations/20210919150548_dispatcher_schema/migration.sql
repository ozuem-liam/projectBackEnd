/*
  Warnings:

  - You are about to drop the column `state` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "state",
ALTER COLUMN "phone_number" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "dispatcher" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "is_available" BOOLEAN NOT NULL,

    CONSTRAINT "dispatcher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "dispatcherId" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_dispatcherId_fkey" FOREIGN KEY ("dispatcherId") REFERENCES "dispatcher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
