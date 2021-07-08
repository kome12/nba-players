import { gql } from "apollo-server";
import playersData from "../seed/players.json";
import teamsData from "../seed/teams.json";
import { PlayerCreateInput, Team } from "../src/models";
import { context } from "./../src/context";
import { constructTestServer } from "./test.server";

describe("Player Schema", () => {
  beforeAll(async () => {
    // await context.prisma.team.create({
    //   data: {
    //     name: "Test Team",
    //   },
    // });
    // await context.prisma.player.create({
    //   data: {
    //     firstName: "First",
    //     lastName: "Last",
    //     currentTeamId: 1,
    //   },
    // });
    for await (const teamData of teamsData) {
      await context.prisma.team.create({
        data: {
          name: teamData.name,
        },
      });
    }

    for await (const playerData of playersData) {
      let team: Team | null = null;
      if (playerData.team) {
        team = await context.prisma.team.findUnique({
          where: { name: playerData.team },
        });
      }
      const newPlayer: PlayerCreateInput = <PlayerCreateInput>{
        firstName: playerData.firstName,
        lastName: playerData.lastName,
        height: playerData.height,
        weight: playerData.weight,
        currentTeamId: team ? team.id : null,
      };
      await context.prisma.player.create({
        data: {
          ...newPlayer,
        },
      });
    }
  });

  afterAll(async () => {
    await context.prisma.$disconnect();
  });

  test("players query", async () => {
    const getPlayers = gql`
      query players {
        players {
          id
          firstName
          lastName
        }
      }
    `;

    const { server } = constructTestServer({
      context,
    });
    const res = await server.executeOperation({ query: getPlayers });
    expect(res.data?.players.length).toBe(11);
  });

  test("player query", async () => {
    const getPlayer = gql`
      query player {
        player(id: 1) {
          id
          firstName
          lastName
        }
      }
    `;

    const { server } = constructTestServer({
      context,
    });

    const res = await server.executeOperation({
      query: getPlayer,
    });
    expect(res.data?.player.id).toBe(1);
    expect(res.data?.player.firstName).toBe("LeBron");
    expect(res.data?.player.lastName).toBe("James");
  });

  test("teams query", async () => {
    const getTeams = gql`
      query teams {
        teams {
          id
          name
        }
      }
    `;

    const { server } = constructTestServer({
      context,
    });
    const res = await server.executeOperation({ query: getTeams });
    expect(res.data?.teams.length).toBe(30);
  });

  test("teamByName", async () => {
    const getTeamByName = gql`
      query teamByName {
        teamByName(name: "Los Angeles Lakers") {
          id
          name
        }
      }
    `;

    const { server } = constructTestServer({
      context,
    });
    const res = await server.executeOperation({
      query: getTeamByName,
      variables: {
        name: "Los Angeles Lakers",
      },
    });
    expect(res.data?.teamByName.id).toBe(23);
    expect(res.data?.teamByName.name).toBe("Los Angeles Lakers");
  });
});
