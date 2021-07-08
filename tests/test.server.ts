import { ApolloServer } from "apollo-server";
import { Context } from "../src/context";
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

export const destroyTestServer = async (
  context: Context,
  server: ApolloServer
): Promise<void> => {
  await context.prisma.$disconnect();
  await server.stop();
};
