/*
  Warnings:

  - You are about to drop the column `quellen` on the `rezept` table. All the data in the column will be lost.
  - Added the required column `instagram` to the `rezept` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube` to the `rezept` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rezept` DROP COLUMN `quellen`,
    ADD COLUMN `instagram` VARCHAR(191) NOT NULL,
    ADD COLUMN `youtube` VARCHAR(191) NOT NULL;
