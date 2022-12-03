/*
  Warnings:

  - You are about to drop the column `chefkoch` on the `rezept` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rezept` DROP COLUMN `chefkoch`,
    ADD COLUMN `tiktok` VARCHAR(191) NULL;
