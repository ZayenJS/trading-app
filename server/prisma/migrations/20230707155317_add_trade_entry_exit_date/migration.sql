/*
  Warnings:

  - Added the required column `entry_date` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "entry_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "exit_date" TIMESTAMP(3);
