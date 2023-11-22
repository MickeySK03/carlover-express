/*
  Warnings:

  - You are about to alter the column `price` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `year` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `mileage` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `reservePrice` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userPhone` on the `ReserveCar` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Car` MODIFY `price` INTEGER NOT NULL,
    MODIFY `year` INTEGER NOT NULL,
    MODIFY `mileage` INTEGER NOT NULL,
    MODIFY `reservePrice` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ReserveCar` MODIFY `userPhone` INTEGER NOT NULL;
