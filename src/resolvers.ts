// import {  } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { Context } from "./context";

export const resolvers = {
  Query: {
    allPlayers: (parent: any, args: any, context: Context) => {
      return context.prisma.player.findMany();
    },
  },
  Mutation: {
    createPlayer: (
      parent: any,
      args: { data: PlayerCreateInput },
      context: Context
    ) => {
      return context.prisma.player.create({
        data: {
          ...args.data,
        },
      });
    },
    createTeam: (
      parent: any,
      args: { data: TeamCreateInput },
      context: Context
    ) => {
      return context.prisma.nBATeam.create({
        data: {
          ...args.data,
        },
      });
    },
  },
  DateTime: DateTimeResolver,
};

interface PlayerCreateInput {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  currentTeamId: number;
}

interface TeamCreateInput {
  name: string;
  location: string;
  homeArena: string;
}
