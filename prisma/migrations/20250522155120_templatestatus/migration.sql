/*
  Warnings:

  - You are about to drop the column `isVerified` on the `template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `template` DROP COLUMN `isVerified`,
    ADD COLUMN `status` ENUM('Verified', 'unVerified', 'Rejected') NOT NULL DEFAULT 'unVerified';
