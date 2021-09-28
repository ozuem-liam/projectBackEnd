-- CreateEnum
CREATE TYPE "Reciever_type" AS ENUM ('customer', 'dispatcher');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL,
    "receiver_type" "Reciever_type" NOT NULL DEFAULT E'customer',
    "receiver_id" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
