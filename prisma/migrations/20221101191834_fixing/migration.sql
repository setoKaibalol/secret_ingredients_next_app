-- DropForeignKey
ALTER TABLE `rezeptKommentar` DROP FOREIGN KEY `rezeptKommentar_rezeptId_fkey`;

-- DropForeignKey
ALTER TABLE `rezeptStep` DROP FOREIGN KEY `rezeptStep_recipeId_fkey`;

-- DropForeignKey
ALTER TABLE `rezeptZutat` DROP FOREIGN KEY `rezeptZutat_recipeId_fkey`;

-- AddForeignKey
ALTER TABLE `rezeptZutat` ADD CONSTRAINT `rezeptZutat_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `rezept`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rezeptStep` ADD CONSTRAINT `rezeptStep_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `rezept`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rezeptKommentar` ADD CONSTRAINT `rezeptKommentar_rezeptId_fkey` FOREIGN KEY (`rezeptId`) REFERENCES `rezept`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
