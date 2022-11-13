/*
  Warnings:

  - You are about to drop the column `likes` on the `rezept` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rezept` DROP COLUMN `likes`;

-- CreateTable
CREATE TABLE `rezeptLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `rezeptId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rezeptLike` ADD CONSTRAINT `rezeptLike_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rezeptLike` ADD CONSTRAINT `rezeptLike_rezeptId_fkey` FOREIGN KEY (`rezeptId`) REFERENCES `rezept`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
