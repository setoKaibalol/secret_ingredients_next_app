/*
  Warnings:

  - You are about to drop the column `kategorienId` on the `rezept` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `rezept` DROP FOREIGN KEY `rezept_kategorienId_fkey`;

-- AlterTable
ALTER TABLE `rezept` DROP COLUMN `kategorienId`;

-- CreateTable
CREATE TABLE `_kategorienTorezept` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_kategorienTorezept_AB_unique`(`A`, `B`),
    INDEX `_kategorienTorezept_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_kategorienTorezept` ADD CONSTRAINT `_kategorienTorezept_A_fkey` FOREIGN KEY (`A`) REFERENCES `kategorien`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_kategorienTorezept` ADD CONSTRAINT `_kategorienTorezept_B_fkey` FOREIGN KEY (`B`) REFERENCES `rezept`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
