/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `dispatcher` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "dispatcher" ALTER COLUMN "is_available" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "dispatcher_phone_number_key" ON "dispatcher"("phone_number");
