/*
  Warnings:

  - You are about to drop the column `email_token` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "email_token";
