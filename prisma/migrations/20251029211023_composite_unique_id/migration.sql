/*
  Warnings:

  - A unique constraint covering the columns `[buyFillId,sellFillId]` on the table `Trade` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Trade_buyFillId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Trade_buyFillId_sellFillId_key" ON "Trade"("buyFillId", "sellFillId");
