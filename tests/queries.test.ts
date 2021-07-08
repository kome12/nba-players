import { createPlayer } from "./player-functions";
import { Context, createMockContext, MockContext } from "./test-context";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test("should create new player ", async () => {
  const dateToUse = new Date();
  const testPlayer = {
    id: 1,
    firstName: "LeBron",
    lastName: "James",
    height: 203,
    weight: 113,
    currentTeamId: 1,
    createdAt: dateToUse,
    updatedAt: dateToUse,
    dateOfBirth: dateToUse,
  };
  const player = {
    firstName: "LeBron",
    lastName: "James",
    height: 203,
    weight: 113,
    currentTeamId: 1,
  };
  mockCtx.prisma.player.create.mockResolvedValue(testPlayer);

  await expect(createPlayer(player, ctx)).resolves.toEqual({
    id: 1,
    firstName: "LeBron",
    lastName: "James",
    height: 203,
    weight: 113,
    currentTeamId: 1,
    createdAt: dateToUse,
    updatedAt: dateToUse,
    dateOfBirth: dateToUse,
  });
});

// test("should update a users name ", async () => {
//   const user = {
//     id: 1,
//     name: "Rich Haines",
//     email: "hello@prisma.io",
//   };
//   mockCtx.prisma.user.update.mockResolvedValue(user);

//   await expect(updateUsername(user, ctx.prisma)).resolves.toEqual({
//     id: 1,
//     name: "Rich Haines",
//     email: "hello@prisma.io",
//   });
// });

// test("should fail if user does not accept terms", async () => {
//   const user = {
//     id: 1,
//     name: "Rich Haines",
//     email: "hello@prisma.io",
//     acceptTermsAndConditions: false,
//   };

//   mockCtx.prisma.user.create.mockRejectedValue(
//     new Error("User must accept terms!")
//   );

//   await expect(createUser(user, ctx.prisma)).resolves.toEqual(
//     new Error("User must accept terms!")
//   );
// });

// import { gql } from "apollo-server";
// import playersData from "../seed/players.json";
// import teamsData from "../seed/teams.json";
// import { context } from "../src/context";
// import { PlayerCreateInput, Team } from "../src/models";
// import { constructTestServer } from "./test.server";

// describe("Player Schema", () => {
//   beforeAll(async () => {
//     // await context.prisma.team.create({
//     //   data: {
//     //     name: "Test Team",
//     //   },
//     // });
//     // await context.prisma.player.create({
//     //   data: {
//     //     firstName: "First",
//     //     lastName: "Last",
//     //     currentTeamId: 1,
//     //   },
//     // });
//     for await (const teamData of teamsData) {
//       await context.prisma.team.create({
//         data: {
//           name: teamData.name,
//         },
//       });
//     }

//     for await (const playerData of playersData) {
//       let team: Team | null = null;
//       if (playerData.team) {
//         team = await context.prisma.team.findUnique({
//           where: { name: playerData.team },
//         });
//       }
//       const newPlayer: PlayerCreateInput = <PlayerCreateInput>{
//         firstName: playerData.firstName,
//         lastName: playerData.lastName,
//         height: playerData.height,
//         weight: playerData.weight,
//         currentTeamId: team ? team.id : null,
//       };
//       await context.prisma.player.create({
//         data: {
//           ...newPlayer,
//         },
//       });
//     }
//   });

//   afterAll(async () => {
//     await context.prisma.$disconnect();
//   });

//   test("players query", async () => {
//     const getPlayers = gql`
//       query players {
//         players {
//           id
//           firstName
//           lastName
//         }
//       }
//     `;

//     const { server } = constructTestServer({
//       context,
//     });
//     const res = await server.executeOperation({ query: getPlayers });
//     expect(res.data?.players.length).toBe(11);
//   });

//   test("player query", async () => {
//     const getPlayer = gql`
//       query player {
//         player(id: 1) {
//           id
//           firstName
//           lastName
//         }
//       }
//     `;

//     const { server } = constructTestServer({
//       context,
//     });

//     const res = await server.executeOperation({
//       query: getPlayer,
//     });
//     expect(res.data?.player.id).toBe(1);
//     expect(res.data?.player.firstName).toBe("LeBron");
//     expect(res.data?.player.lastName).toBe("James");
//   });

//   test("teams query", async () => {
//     const getTeams = gql`
//       query teams {
//         teams {
//           id
//           name
//         }
//       }
//     `;

//     const { server } = constructTestServer({
//       context,
//     });
//     const res = await server.executeOperation({ query: getTeams });
//     expect(res.data?.teams.length).toBe(30);
//   });

//   test("playersOnTeamByTeamId query", async () => {
//     const playersOnTeamByTeamId = gql`
//       query playersOnTeamByTeamId {
//         playersOnTeamByTeamId(teamId: 2) {
//           id
//           firstName
//           lastName
//         }
//       }
//     `;

//     const { server } = constructTestServer({
//       context,
//     });

//     const res = await server.executeOperation({
//       query: playersOnTeamByTeamId,
//     });
//     expect(res.data?.playersOnTeamByTeamId.length).toBe(2);
//   });

//   test("team query", async () => {
//     const getTeam = gql`
//       query team {
//         team(id: 23) {
//           id
//           name
//         }
//       }
//     `;

//     const { server } = constructTestServer({
//       context,
//     });

//     const res = await server.executeOperation({
//       query: getTeam,
//     });
//     expect(res.data?.team.id).toBe(23);
//     expect(res.data?.team.name).toBe("Los Angeles Lakers");
//   });

//   test("teamByName", async () => {
//     const getTeamByName = gql`
//       query teamByName {
//         teamByName(name: "Los Angeles Lakers") {
//           id
//           name
//         }
//       }
//     `;

//     const { server } = constructTestServer({
//       context,
//     });
//     const res = await server.executeOperation({
//       query: getTeamByName,
//     });
//     expect(res.data?.teamByName.id).toBe(23);
//     expect(res.data?.teamByName.name).toBe("Los Angeles Lakers");
//   });

//   test("teamWithPlayers query", async () => {
//     const teamWithPlayers = gql`
//       query teamWithPlayers {
//         teamWithPlayers(id: 2) {
//           id
//           name
//           players {
//             id
//             firstName
//             lastName
//           }
//         }
//       }
//     `;

//     const { server } = constructTestServer({
//       context,
//     });
//     const res = await server.executeOperation({
//       query: teamWithPlayers,
//     });
//     expect(res.data?.teamWithPlayers.id).toBe(2);
//     expect(res.data?.teamWithPlayers.name).toBe("Brooklyn Nets");
//     expect(res.data?.teamWithPlayers.players.length).toBe(2);
//   });
// });
