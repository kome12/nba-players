import { ApolloServer } from "apollo-server";
import { Context } from "../src/context";
import { schema } from "./../src/server";

export const constructTestServer = ({ context = {} } = {}): {
  server: ApolloServer;
} => {
  const server = new ApolloServer({
    schema,
    context,
  });

  return { server };
};

export const testServer = (context: Context): ApolloServer => {
  return new ApolloServer({
    schema,
    context,
  });
};
