import { ApolloServer } from "apollo-server";
import { schema } from "./../src/server";

export const constructTestServer = ({ context = {} } = {}): {
  server: ApolloServer;
} => {
  const server = new ApolloServer({
    schema: schema,
    context,
  });

  return { server };
};
