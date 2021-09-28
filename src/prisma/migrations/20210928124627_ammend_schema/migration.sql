/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Notification";

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL,
    "receiver_type" "Reciever_type" NOT NULL DEFAULT E'customer',
    "receiver_id" TEXT NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);
