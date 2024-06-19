/*
  Warnings:

  - Added the required column `isReturn` to the `BorowingBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `borowingbook` ADD COLUMN `isReturn` BOOLEAN NOT NULL;
