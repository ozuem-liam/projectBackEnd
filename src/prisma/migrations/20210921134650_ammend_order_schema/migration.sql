/*
  Warnings:

  - You are about to drop the column `name` on the `category` table. All the data in the column will be lost.
  - Added the required column `category_name` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_delete` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "name",
ADD COLUMN     "category_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "is_delete" BOOLEAN NOT NULL;
