-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('BASIC', 'ADMIN') NOT NULL DEFAULT 'BASIC';

-- CreateTable
CREATE TABLE `rezept` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `zubereitungszeit` VARCHAR(191) NOT NULL,
    `portionen` INTEGER NOT NULL,
    `schwierigkeitsgrad` VARCHAR(191) NOT NULL,
    `utensilien` VARCHAR(191) NULL,
    `quellen` VARCHAR(191) NULL,
    `aufrufe` INTEGER NOT NULL DEFAULT 0,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `dislikes` INTEGER NOT NULL DEFAULT 0,
    `image` VARCHAR(191) NOT NULL,
    `typ` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rezeptZutat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipeId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `anzahl` DOUBLE NOT NULL,
    `einheit` VARCHAR(191) NOT NULL,
    `kommentar` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rezeptStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipeId` INTEGER NOT NULL,
    `nummer` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rezeptKommentar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `rezeptId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rezept` ADD CONSTRAINT `rezept_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rezeptZutat` ADD CONSTRAINT `rezeptZutat_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `rezept`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rezeptStep` ADD CONSTRAINT `rezeptStep_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `rezept`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rezeptKommentar` ADD CONSTRAINT `rezeptKommentar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rezeptKommentar` ADD CONSTRAINT `rezeptKommentar_rezeptId_fkey` FOREIGN KEY (`rezeptId`) REFERENCES `rezept`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
