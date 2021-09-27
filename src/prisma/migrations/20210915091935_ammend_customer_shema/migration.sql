/*
  Warnings:

  - Added the required column `email_token` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "email_token" JSONB NOT NULL;
