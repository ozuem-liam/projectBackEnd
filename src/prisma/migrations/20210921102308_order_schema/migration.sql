-- CreateEnum
CREATE TYPE "Status_type" AS ENUM ('pending', 'in_progress', 'delivered');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "status" "Status_type" NOT NULL DEFAULT E'pending',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_items" (
    "id" TEXT NOT NULL,
    "sub_total" INTEGER NOT NULL,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "Order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,
    "order_items_id" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order_items" ADD CONSTRAINT "Order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_order_items_id_fkey" FOREIGN KEY ("order_items_id") REFERENCES "Order_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
