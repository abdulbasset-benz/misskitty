/*
  Warnings:

  - You are about to drop the column `customerAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhone` on the `Order` table. All the data in the column will be lost.
  - Added the required column `CustomerAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerPhone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "customerAddress",
DROP COLUMN "customerName",
DROP COLUMN "customerPhone",
ADD COLUMN     "CustomerAddress" TEXT NOT NULL,
ADD COLUMN     "CustomerName" TEXT NOT NULL,
ADD COLUMN     "CustomerPhone" TEXT NOT NULL;
