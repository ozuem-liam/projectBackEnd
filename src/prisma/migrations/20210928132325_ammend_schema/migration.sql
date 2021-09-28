/*
  Warnings:

  - You are about to drop the column `customerId` on the `notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_customerId_fkey";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "customerId";

-- CreateTable
CREATE TABLE "_CustomerToNotification" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerToNotification_AB_unique" ON "_CustomerToNotification"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerToNotification_B_index" ON "_CustomerToNotification"("B");

-- AddForeignKey
ALTER TABLE "_CustomerToNotification" ADD FOREIGN KEY ("A") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerToNotification" ADD FOREIGN KEY ("B") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
