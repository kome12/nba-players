import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import playersData from "../seed/players.json";
import teamsData from "../seed/teams.json";
import { context } from "../src/context";
import { PlayerCreateInput, Team } from "../src/models";
import { resolvers } from "../src/resolvers";
import { typeDefs } from "../src/schema";

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

describe("NBA API", () => {
  let server: ApolloServer;
  beforeAll(async () => {
    server = new ApolloServer({
      schema,
      context,
    });
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
    await context.prisma.team.deleteMany();
    await context.prisma.player.deleteMany();
    await context.prisma.$disconnect();
  });

  describe("queries", () => {
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

      const res = await server.executeOperation({
        query: getPlayer,
      });
      expect(res.data?.player.id).toBe(1);
      expect(res.data?.player.firstName).toBe("LeBron");
      expect(res.data?.player.lastName).toBe("James");
    });

    test("playersOnTeamByTeamId query", async () => {
      const playersOnTeamByTeamId = gql`
        query playersOnTeamByTeamId {
          playersOnTeamByTeamId(teamId: 2) {
            id
            firstName
            lastName
          }
        }
      `;

      const res = await server.executeOperation({
        query: playersOnTeamByTeamId,
      });
      expect(res.data?.playersOnTeamByTeamId.length).toBe(2);
    });

    test("playersByName query", async () => {
      const playersByName = gql`
        query playersByName {
          playersByName(firstName: "Stephen", lastName: "curry") {
            id
            firstName
            lastName
          }
        }
      `;

      const res = await server.executeOperation({
        query: playersByName,
      });
      expect(res.data?.playersByName.length).toBe(1);
    });

    test("playersByPartialName query", async () => {
      const playersByPartialName = gql`
        query playersByPartialName {
          playersByPartialName(partialName: "on") {
            id
            firstName
            lastName
          }
        }
      `;

      const res = await server.executeOperation({
        query: playersByPartialName,
      });
      expect(res.data?.playersByPartialName.length).toBe(5);
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

      const res = await server.executeOperation({ query: getTeams });
      expect(res.data?.teams.length).toBe(30);
    });

    test("team query", async () => {
      const getTeam = gql`
        query team {
          team(id: 23) {
            id
            name
          }
        }
      `;

      const res = await server.executeOperation({
        query: getTeam,
      });
      expect(res.data?.team.id).toBe(23);
      expect(res.data?.team.name).toBe("Los Angeles Lakers");
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

      const res = await server.executeOperation({
        query: getTeamByName,
      });
      expect(res.data?.teamByName.id).toBe(23);
      expect(res.data?.teamByName.name).toBe("Los Angeles Lakers");
    });

    test("teamWithPlayers query", async () => {
      const teamWithPlayers = gql`
        query teamWithPlayers {
          teamWithPlayers(id: 2) {
            id
            name
            players {
              id
              firstName
              lastName
            }
          }
        }
      `;

      const res = await server.executeOperation({
        query: teamWithPlayers,
      });
      expect(res.data?.teamWithPlayers.id).toBe(2);
      expect(res.data?.teamWithPlayers.name).toBe("Brooklyn Nets");
      expect(res.data?.teamWithPlayers.players.length).toBe(2);
    });
  });

  describe("mutations", () => {
    let teamId: number;
    let playerId: number;

    test("create team", async () => {
      const createTeam = gql`
        mutation createTeam {
          createTeam(data: { name: "Test Team" }) {
            id
            name
          }
        }
      `;

      const res = await server.executeOperation({ query: createTeam });
      if (res.data && res.data?.createTeam) {
        teamId = res.data.createTeam.id;
      }
      expect(res.data?.createTeam.name).toBe("Test Team");
    });

    test("create player", async () => {
      const createPlayer = gql`
        mutation createPlayer($data: PlayerCreateInput!) {
          createPlayer(data: $data) {
            id
            firstName
            lastName
          }
        }
      `;

      const res = await server.executeOperation({
        query: createPlayer,
        variables: {
          data: {
            firstName: "Test First Name",
            lastName: "Test Last Name",
            currentTeamId: 31,
          },
        },
      });
      if (res.data && res.data.createPlayer) {
        playerId = res.data.createPlayer.id;
      }
      expect(res.data?.createPlayer.firstName).toBe("Test First Name");
      expect(res.data?.createPlayer.lastName).toBe("Test Last Name");
      expect(res.data?.createPlayer.height).toBeUndefined();
      expect(res.data?.createPlayer.weight).toBeUndefined();
    });

    test("update player", async () => {
      const updatePlayer = gql`
        mutation updatePlayer {
          updatePlayer(
            id: 12
            data: {
              firstName: "Update First Name"
              lastName: "Update Last Name"
              height: 123
              weight: 90
            }
          ) {
            id
            firstName
            lastName
            height
            weight
          }
        }
      `;

      const res = await server.executeOperation({ query: updatePlayer });

      expect(res.data?.updatePlayer.id).toBe(playerId);
      expect(res.data?.updatePlayer.firstName).toBe("Update First Name");
      expect(res.data?.updatePlayer.lastName).toBe("Update Last Name");
      expect(res.data?.updatePlayer.height).toBe(123);
      expect(res.data?.updatePlayer.weight).toBe(90);
    });

    test("update team", async () => {
      const updateTeam = gql`
        mutation updateTeam {
          updateTeam(
            id: 31
            data: { name: "Updated Team Name", abbreviation: "UTN" }
          ) {
            id
            name
            abbreviation
          }
        }
      `;

      const res = await server.executeOperation({ query: updateTeam });

      expect(res.data?.updateTeam.id).toBe(teamId);
      expect(res.data?.updateTeam.name).toBe("Updated Team Name");
      expect(res.data?.updateTeam.abbreviation).toBe("UTN");
    });

    test("delete player", async () => {
      const deletePlayer = gql`
        mutation deletePlayer {
          deletePlayer(id: 12) {
            id
            firstName
            lastName
            height
            weight
          }
        }
      `;

      const res = await server.executeOperation({ query: deletePlayer });

      expect(res.data?.deletePlayer.id).toBe(playerId);
      expect(res.data?.deletePlayer.firstName).toBe("Update First Name");
      expect(res.data?.deletePlayer.lastName).toBe("Update Last Name");
      expect(res.data?.deletePlayer.height).toBe(123);
      expect(res.data?.deletePlayer.weight).toBe(90);

      const getPlayer = gql`
        query player {
          player(id: 12) {
            id
            firstName
            lastName
          }
        }
      `;

      const getRes = await server.executeOperation({
        query: getPlayer,
      });
      expect(getRes.data?.player).toBeNull();
    });

    test("delete team", async () => {
      const deleteTeam = gql`
        mutation deleteTeam {
          deleteTeam(id: 31) {
            id
            name
            abbreviation
          }
        }
      `;

      const res = await server.executeOperation({ query: deleteTeam });
      expect(res.data?.deleteTeam.id).toBe(teamId);
      expect(res.data?.deleteTeam.name).toBe("Updated Team Name");
      expect(res.data?.deleteTeam.abbreviation).toBe("UTN");

      const getTeam = gql`
        query team {
          team(id: 31) {
            id
            name
          }
        }
      `;

      const getRes = await server.executeOperation({
        query: getTeam,
      });
      expect(getRes.data?.team).toBeNull();
    });

    test("cascade delete team", async () => {
      const newTeam = await context.prisma.team.create({
        data: {
          name: "Test Cascade Team",
        },
      });
      const newPlayer = await context.prisma.player.create({
        data: {
          firstName: "Test Cascade First Name",
          lastName: "Test Cascade Last Name",
          currentTeamId: newTeam.id,
        },
      });

      const getPlayer = gql`
        query player {
          player(id: 13) {
            id
            firstName
            lastName
            currentTeam {
              id
              name
            }
          }
        }
      `;

      const getPlayerRes = await server.executeOperation({
        query: getPlayer,
      });
      expect(getPlayerRes.data?.player.id).toBe(newPlayer.id);
      expect(getPlayerRes.data?.player.firstName).toBe(newPlayer.firstName);
      expect(getPlayerRes.data?.player.lastName).toBe(newPlayer.lastName);
      expect(getPlayerRes.data?.player.currentTeam.name).toBe(
        "Test Cascade Team"
      );

      const deleteTeam = gql`
        mutation deleteTeam {
          deleteTeam(id: 32) {
            id
            name
            abbreviation
          }
        }
      `;

      const res = await server.executeOperation({ query: deleteTeam });

      expect(res.data?.deleteTeam.id).toBe(newTeam.id);
      expect(res.data?.deleteTeam.name).toBe(newTeam.name);
      expect(res.data?.deleteTeam.abbreviation).toBeNull();

      const getCascadedPlayer = await context.prisma.player.findUnique({
        where: { id: newPlayer.id },
      });
      expect(getCascadedPlayer).toBeNull();
    });
  });
});
