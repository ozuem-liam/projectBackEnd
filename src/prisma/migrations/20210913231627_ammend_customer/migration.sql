/*
  Warnings:

  - A unique constraint covering the columns `[card_number]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cards_card_number_key" ON "cards"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_phone_number_key" ON "customer"("phone_number");
