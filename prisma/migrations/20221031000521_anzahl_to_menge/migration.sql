/*
  Warnings:

  - You are about to drop the column `anzahl` on the `rezeptZutat` table. All the data in the column will be lost.
  - Added the required column `menge` to the `rezeptZutat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rezeptZutat` DROP COLUMN `anzahl`,
    ADD COLUMN `menge` DOUBLE NOT NULL;
