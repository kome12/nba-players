import { ApolloServer, makeExecutableSchema } from "apollo-server";
import { context } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
  console.log(`
🚀 Server ready at: http://localhost:4000
⭐️ See sample queries: http://pris.ly/e/ts/graphql-sdl-first#using-the-graphql-api`)
);
