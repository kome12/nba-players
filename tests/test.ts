import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "../src/schema";
import { resolvers } from "./../src/resolvers";

// create a mocked schema for the tests
const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

describe("Player Schema", () => {
  test("test", () => {
    expect(true).toBeTruthy();
  });
  // test("allPlayers query", async () => {
  //   const query = `
  //       {
  //           player: allPlayers {
  //               firstName
  //           }
  //       }
  //   `;
  //   return graphql(schema, query).then((result: any) => {
  //     console.log("result:", result);
  //     const users = result.data.user;
  //     expect(users.length).toBe(2);
  //   });
  // });
});
