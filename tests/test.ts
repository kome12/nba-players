import { gql } from "apollo-server";
import { context } from "./../src/context";
import { constructTestServer } from "./test.server";

describe("Player Schema", () => {
  beforeAll(async () => {
    await context.prisma.team.create({
      data: {
        name: "Test Team",
      },
    });
    await context.prisma.player.create({
      data: {
        firstName: "First",
        lastName: "Last",
        currentTeamId: 1,
      },
    });
  });

  afterAll(async () => {
    await context.prisma.$disconnect();
  });

  test("allPlayers query", async () => {
    const getAllPlayers = gql`
      query allPlayers {
        allPlayers {
          id
          firstName
          lastName
        }
      }
    `;

    const { server } = constructTestServer({
      context,
    });
    const res = await server.executeOperation({ query: getAllPlayers });
    expect(res.data?.allPlayers.length).toBe(1);
    await server.stop();
  });
});
