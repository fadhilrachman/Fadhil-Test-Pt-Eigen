/*
  Warnings:

  - Added the required column `count` to the `BorowingBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borowingbook` ADD COLUMN `count` INTEGER NOT NULL;
