-- AlterTable
ALTER TABLE `evolution` ADD COLUMN `type` ENUM('PRE', 'NEXT') NOT NULL DEFAULT 'PRE';
