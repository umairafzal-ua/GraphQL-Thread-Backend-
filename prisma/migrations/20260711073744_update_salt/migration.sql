/*
  Warnings:

  - You are about to drop the column `Salt` on the `users` table. All the data in the column will be lost.
  - Added the required column `salt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "Salt",
ADD COLUMN     "salt" TEXT NOT NULL;
