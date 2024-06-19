/*
  Warnings:

  - You are about to drop the column `stok` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `borowingbook` table. All the data in the column will be lost.
  - Added the required column `borrowingCount` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `stok`,
    ADD COLUMN `borrowingCount` INTEGER NOT NULL,
    ADD COLUMN `stock` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `borowingbook` DROP COLUMN `count`;
