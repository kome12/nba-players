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

  test("players query", async () => {
    const getplayers = gql`
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
    const res = await server.executeOperation({ query: getplayers });
    expect(res.data?.players.length).toBe(1);
    await server.stop();
  });
});
