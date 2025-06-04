/*
  Warnings:

  - Added the required column `category` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `template` ADD COLUMN `category` ENUM('Navbar', 'Footer', 'Hero', 'CTA', 'Features', 'Testimonials', 'Pricing', 'Forms', 'Blog', 'Team', 'FAQ', 'Gallery', 'Steps', 'Stats', 'Cards', 'Login', 'Contact', 'Timeline', 'Logos', 'EmptySet') NOT NULL;
