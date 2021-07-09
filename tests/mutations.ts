import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import { context } from "../src/context";
import { resolvers } from "../src/resolvers";
import { typeDefs } from "../src/schema";

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

describe("Mutations", () => {
  let server: ApolloServer;
  let teamId: number;
  let playerId: number;

  beforeAll(async () => {
    server = new ApolloServer({
      schema,
      context,
    });
    // for await (const teamData of teamsData) {
    //   await context.prisma.team.create({
    //     data: {
    //       name: teamData.name,
    //     },
    //   });
    // }

    // for await (const playerData of playersData) {
    //   let team: Team | null = null;
    //   if (playerData.team) {
    //     team = await context.prisma.team.findUnique({
    //       where: { name: playerData.team },
    //     });
    //   }
    //   const newPlayer: PlayerCreateInput = <PlayerCreateInput>{
    //     firstName: playerData.firstName,
    //     lastName: playerData.lastName,
    //     height: playerData.height,
    //     weight: playerData.weight,
    //   };
    //   if (team) {
    //     newPlayer.currentTeamId = team.id;
    //   }
    //   await context.prisma.player.create({
    //     data: {
    //       ...newPlayer,
    //     },
    //   });
    // }
  });

  afterAll(async () => {
    // await context.prisma.team.deleteMany();
    // await context.prisma.player.deleteMany();
    await context.prisma.$disconnect();
  });

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
    console.log("res in mutation createTeam:", res);
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

    // const { server } = constructTestServer({
    //   context,
    // });
    // const server = testServer(context);
    // const server = new ApolloServer({
    //   schema,
    //   context,
    // });
    const res = await server.executeOperation({
      query: createPlayer,
      variables: {
        data: {
          firstName: "Test First Name",
          lastName: "Test Last Name",
          currentTeamId: teamId,
        },
      },
    });
    console.log("res in mutation:", res);
    expect(res.data?.createPlayer.firstName).toBe("Test First Name");
    expect(res.data?.createPlayer.lastName).toBe("Test Last Name");
    expect(res.data?.createPlayer.currentTeamId).toBe(teamId);
    expect(res.data?.createPlayer.height).toBeNull();
    expect(res.data?.createPlayer.weight).toBeNull();
    // expect(res.data?.player.length).toBe(0);
    // await server.stop();
  });

  test("update player", async () => {
    const updatePlayer = gql`
      mutation updatePlayer {
        updatePlayer(
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
    expect(res.data?.updatePlayer.firstName).toBe("Update First Name");
    expect(res.data?.updatePlayer.lastName).toBe("Update Last Name");
    expect(res.data?.updatePlayer.currentTeamId).toBe(teamId);
    expect(res.data?.updatePlayer.height).toBe(123);
    expect(res.data?.updatePlayer.weight).toBe(90);
  });

  // test("player query", async () => {
  //   const getPlayer = gql`
  //     query player {
  //       player(id: 1) {
  //         id
  //         firstName
  //         lastName
  //       }
  //     }
  //   `;

  //   const { server } = constructTestServer({
  //     context,
  //   });

  //   const res = await server.executeOperation({
  //     query: getPlayer,
  //   });
  //   expect(res.data?.player.id).toBe(1);
  //   expect(res.data?.player.firstName).toBe("LeBron");
  //   expect(res.data?.player.lastName).toBe("James");
  //   await server.stop();
  // });

  // test("playersOnTeamByTeamId query", async () => {
  //   const playersOnTeamByTeamId = gql`
  //     query playersOnTeamByTeamId {
  //       playersOnTeamByTeamId(teamId: 2) {
  //         id
  //         firstName
  //         lastName
  //       }
  //     }
  //   `;

  //   const { server } = constructTestServer({
  //     context,
  //   });

  //   const res = await server.executeOperation({
  //     query: playersOnTeamByTeamId,
  //   });
  //   expect(res.data?.playersOnTeamByTeamId.length).toBe(2);
  //   await server.stop();
  // });

  // test("teams query", async () => {
  //   const getTeams = gql`
  //     query teams {
  //       teams {
  //         id
  //         name
  //       }
  //     }
  //   `;

  //   const { server } = constructTestServer({
  //     context,
  //   });
  //   const res = await server.executeOperation({ query: getTeams });
  //   expect(res.data?.teams.length).toBe(30);
  //   await server.stop();
  // });

  // test("team query", async () => {
  //   const getTeam = gql`
  //     query team {
  //       team(id: 23) {
  //         id
  //         name
  //       }
  //     }
  //   `;

  //   const { server } = constructTestServer({
  //     context,
  //   });

  //   const res = await server.executeOperation({
  //     query: getTeam,
  //   });
  //   expect(res.data?.team.id).toBe(23);
  //   expect(res.data?.team.name).toBe("Los Angeles Lakers");
  //   await server.stop();
  // });

  // test("teamByName", async () => {
  //   const getTeamByName = gql`
  //     query teamByName {
  //       teamByName(name: "Los Angeles Lakers") {
  //         id
  //         name
  //       }
  //     }
  //   `;

  //   const { server } = constructTestServer({
  //     context,
  //   });
  //   const res = await server.executeOperation({
  //     query: getTeamByName,
  //   });
  //   expect(res.data?.teamByName.id).toBe(23);
  //   expect(res.data?.teamByName.name).toBe("Los Angeles Lakers");
  //   await server.stop();
  // });

  // test("teamWithPlayers query", async () => {
  //   const teamWithPlayers = gql`
  //     query teamWithPlayers {
  //       teamWithPlayers(id: 2) {
  //         id
  //         name
  //         players {
  //           id
  //           firstName
  //           lastName
  //         }
  //       }
  //     }
  //   `;

  //   const { server } = constructTestServer({
  //     context,
  //   });
  //   const res = await server.executeOperation({
  //     query: teamWithPlayers,
  //   });
  //   expect(res.data?.teamWithPlayers.id).toBe(2);
  //   expect(res.data?.teamWithPlayers.name).toBe("Brooklyn Nets");
  //   expect(res.data?.teamWithPlayers.players.length).toBe(2);
  //   await server.stop();
  // });
});
