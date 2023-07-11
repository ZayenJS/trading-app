/*
  Warnings:

  - You are about to drop the `Trade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trade" DROP CONSTRAINT "Trade_trader_id_fkey";

-- DropTable
DROP TABLE "Trade";

-- CreateTable
CREATE TABLE "trades" (
    "id" TEXT NOT NULL,
    "type" "TradeType" NOT NULL,
    "base_currency" TEXT NOT NULL,
    "quote_currency" TEXT NOT NULL,
    "fees" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
    "notes" TEXT,
    "entry_price" DOUBLE PRECISION NOT NULL,
    "exit_price" DOUBLE PRECISION,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "exit_date" TIMESTAMP(3),
    "quantity" DOUBLE PRECISION NOT NULL,
    "trader_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trades" ADD CONSTRAINT "trades_trader_id_fkey" FOREIGN KEY ("trader_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
