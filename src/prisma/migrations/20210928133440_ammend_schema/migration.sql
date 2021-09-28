/*
  Warnings:

  - You are about to drop the `_CustomerToNotification` table. If the table is not empty, all the data it contains will be lost.
  - The required column `notification_id` was added to the `customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_CustomerToNotification" DROP CONSTRAINT "_CustomerToNotification_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerToNotification" DROP CONSTRAINT "_CustomerToNotification_B_fkey";

-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "notification_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CustomerToNotification";
