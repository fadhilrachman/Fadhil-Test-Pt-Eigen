/*
  Warnings:

  - The `isReturn` column on the `borowingbook` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `borowingbook` DROP COLUMN `isReturn`,
    ADD COLUMN `isReturn` DATETIME(3) NULL;
