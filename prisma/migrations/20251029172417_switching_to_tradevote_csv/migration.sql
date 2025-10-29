/*
  Warnings:

  - You are about to drop the column `avgFillPrice` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `expiry` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `expiryTime` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `limitPrice` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `side` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `stopLoss` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `stopPrice` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `takeProfit` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Trade` table. All the data in the column will be lost.
  - You are about to drop the column `updateTime` on the `Trade` table. All the data in the column will be lost.
  - Added the required column `boughtTimestamp` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyFillId` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyPrice` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pnl` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceFormat` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceFormatType` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellFillId` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soldTimestamp` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tickSize` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Trade_orderId_key";

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "avgFillPrice",
DROP COLUMN "expiry",
DROP COLUMN "expiryTime",
DROP COLUMN "limitPrice",
DROP COLUMN "orderId",
DROP COLUMN "side",
DROP COLUMN "status",
DROP COLUMN "stopLoss",
DROP COLUMN "stopPrice",
DROP COLUMN "takeProfit",
DROP COLUMN "type",
DROP COLUMN "updateTime",
ADD COLUMN     "boughtTimestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "buyFillId" TEXT NOT NULL,
ADD COLUMN     "buyPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "pnl" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "priceFormat" INTEGER NOT NULL,
ADD COLUMN     "priceFormatType" INTEGER NOT NULL,
ADD COLUMN     "sellFillId" TEXT NOT NULL,
ADD COLUMN     "sellPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "soldTimestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tickSize" DOUBLE PRECISION NOT NULL;
