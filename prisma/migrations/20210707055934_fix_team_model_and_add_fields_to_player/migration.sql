/*
  Warnings:

  - You are about to drop the `NBATeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_currentTeamId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ALTER COLUMN "height" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;

-- DropTable
DROP TABLE "NBATeam";

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD FOREIGN KEY ("currentTeamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
