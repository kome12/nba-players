/*
  Warnings:

  - You are about to drop the column `home_arena` on the `NBATeam` table. All the data in the column will be lost.
  - Added the required column `homeArena` to the `NBATeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NBATeam" DROP COLUMN "home_arena",
ADD COLUMN     "homeArena" VARCHAR(255) NOT NULL;
