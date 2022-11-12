/*
  Warnings:

  - Added the required column `kategorienId` to the `rezept` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rezept` ADD COLUMN `kategorienId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT 'gray',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategorien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `kategorien_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_rezeptTotags` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_rezeptTotags_AB_unique`(`A`, `B`),
    INDEX `_rezeptTotags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rezept` ADD CONSTRAINT `rezept_kategorienId_fkey` FOREIGN KEY (`kategorienId`) REFERENCES `kategorien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_rezeptTotags` ADD CONSTRAINT `_rezeptTotags_A_fkey` FOREIGN KEY (`A`) REFERENCES `rezept`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_rezeptTotags` ADD CONSTRAINT `_rezeptTotags_B_fkey` FOREIGN KEY (`B`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
