import { PrismaClient } from "@prisma/client";
import playersData from "../seed/players.json";
import teamsData from "../seed/teams.json";
import { PlayerCreateInput, Team } from "../src/models";
const prisma = new PrismaClient();

export async function seed() {
  for await (const teamData of teamsData) {
    // await prisma.team.upsert({
    //   where: {
    //     name: teamData.name,
    //   },
    //   create: {
    //     name: teamData.name,
    //   },
    // });
    await prisma.team.upsert({
      where: {
        name: teamData.name,
      },
      update: {},
      create: {
        name: teamData.name,
      },
    });
  }

  for await (const playerData of playersData) {
    let team: Team | null = null;
    if (playerData.team) {
      team = await prisma.team.findUnique({
        where: { name: playerData.team },
      });
    }
    const existingPlayer = await prisma.player.findFirst({
      where: {
        firstName: playerData.firstName,
        lastName: playerData.lastName,
        currentTeamId: team ? team.id : undefined,
      },
    });
    if (!existingPlayer) {
      const newPlayer: PlayerCreateInput = <PlayerCreateInput>{
        firstName: playerData.firstName,
        lastName: playerData.lastName,
        height: playerData.height,
        weight: playerData.weight,
        currentTeamId: team ? team.id : null,
      };
      await prisma.player.create({
        data: {
          ...newPlayer,
        },
      });
    }
  }
  prisma.$disconnect();
}
