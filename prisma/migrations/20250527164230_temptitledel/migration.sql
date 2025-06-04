/*
  Warnings:

  - You are about to drop the column `title` on the `template` table. All the data in the column will be lost.
  - The values [Logos,EmptySet] on the enum `Template_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `template` DROP COLUMN `title`,
    MODIFY `category` ENUM('Navbar', 'Footer', 'Hero', 'CTA', 'Features', 'Testimonials', 'Pricing', 'Forms', 'Blog', 'Team', 'FAQ', 'Gallery', 'Steps', 'Stats', 'Cards', 'Login', 'Contact', 'Timeline') NOT NULL;
