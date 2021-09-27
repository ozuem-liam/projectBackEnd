-- CreateEnum
CREATE TYPE "Payment_type" AS ENUM ('Card', 'Paypal', 'Cash');

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "payment_type" "Payment_type" NOT NULL DEFAULT E'Cash',

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "card_number" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "cvv" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
