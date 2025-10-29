/*
  Warnings:

  - A unique constraint covering the columns `[buyFillId]` on the table `Trade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sellFillId]` on the table `Trade` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trade_buyFillId_key" ON "Trade"("buyFillId");

-- CreateIndex
CREATE UNIQUE INDEX "Trade_sellFillId_key" ON "Trade"("sellFillId");
