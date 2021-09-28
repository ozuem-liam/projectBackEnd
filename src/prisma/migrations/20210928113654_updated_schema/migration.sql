/*
  Warnings:

  - You are about to drop the column `customer_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `product_details` on the `order_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "customer_id",
DROP COLUMN "product_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "product_details",
ADD COLUMN     "product_details" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
