/*
  Warnings:

  - You are about to drop the column `phone` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `cartCarId` on the `ReserveCar` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `ReserveCar` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarCatalog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartCar` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driveTrain` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ReserveCar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhone` to the `ReserveCar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `CartCar` DROP FOREIGN KEY `CartCar_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ReserveCar` DROP FOREIGN KEY `ReserveCar_cartCarId_fkey`;

-- AlterTable
ALTER TABLE `Car` DROP COLUMN `phone`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `driveTrain` VARCHAR(191) NOT NULL,
    ADD COLUMN `model` VARCHAR(191) NOT NULL,
    ADD COLUMN `seat` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ReserveCar` DROP COLUMN `cartCarId`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD COLUMN `userPhone` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('Reserved', 'NotReserve') NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    DROP COLUMN `phone`,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE `Admin`;

-- DropTable
DROP TABLE `CarCatalog`;

-- DropTable
DROP TABLE `CartCar`;

-- CreateTable
CREATE TABLE `ImageCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WishListCar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImageCar` ADD CONSTRAINT `ImageCar_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishListCar` ADD CONSTRAINT `WishListCar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishListCar` ADD CONSTRAINT `WishListCar_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReserveCar` ADD CONSTRAINT `ReserveCar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
