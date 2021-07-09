import { createPlayer, updatePlayer } from "./player.functions";
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

test("should update a player", async () => {
  const dateToUse = new Date();
  const testPlayer = {
    id: 1,
    firstName: "LeBron",
    lastName: "James",
    height: 203,
    weight: 113,
    currentTeamId: 2,
    createdAt: dateToUse,
    updatedAt: dateToUse,
    dateOfBirth: dateToUse,
  };
  const player = {
    currentTeamId: 2,
  };
  mockCtx.prisma.player.update.mockResolvedValue(testPlayer);

  await expect(updatePlayer(1, player, ctx)).resolves.toEqual({
    id: 1,
    firstName: "LeBron",
    lastName: "James",
    height: 203,
    weight: 113,
    currentTeamId: 2,
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
