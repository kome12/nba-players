import { ApolloServer, makeExecutableSchema } from "apollo-server";
import { context } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const port = process.env.PORT || 4000;

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

new ApolloServer({
  schema,
  context: context,
  playground: true,
  introspection: true,
}).listen({ port: port }, () =>
  console.log(`
🚀 Server ready at: http://localhost:${port}`)
);
