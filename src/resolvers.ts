import { DateTimeResolver } from "graphql-scalars";
import { Context } from "./context";
import {
  PlayerCreateInput,
  PlayerUpdateInput,
  TeamCreateInput,
  TeamUpdateInput,
} from "./models";

export const resolvers = {
  Query: {
    allPlayers: (parent: any, args: any, context: Context) => {
      return context.prisma.player.findMany({
        include: {
          currentTeam: true,
        },
      });
    },
    player: async (parent: any, args: { id: number }, context: Context) => {
      const player = await context.prisma.player.findUnique({
        where: {
          id: args.id,
        },
        include: {
          currentTeam: true,
        },
      });
      return player;
    },
    teamByName: (parent: any, args: { name: string }, context: Context) => {
      return context.prisma.team.findUnique({
        where: {
          name: args.name,
        },
      });
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
    updatePlayer: (
      parent: any,
      args: { id: number; data: PlayerUpdateInput },
      context: Context
    ) => {
      return context.prisma.player.update({
        where: {
          id: args.id,
        },
        data: {
          ...args.data,
        },
      });
    },
    deletePlayer: (parent: any, args: { id: number }, context: Context) => {
      return context.prisma.player.delete({
        where: {
          id: args.id,
        },
      });
    },
    createTeam: (
      parent: any,
      args: { data: TeamCreateInput },
      context: Context
    ) => {
      return context.prisma.team.create({
        data: {
          ...args.data,
        },
      });
    },
    updateTeam: (
      parent: any,
      args: { id: number; data: TeamUpdateInput },
      context: Context
    ) => {
      return context.prisma.team.update({
        where: {
          id: args.id,
        },
        data: {
          ...args.data,
        },
      });
    },
    deleteTeam: (parent: any, args: { id: number }, context: Context) => {
      return context.prisma.team.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
  DateTime: DateTimeResolver,
};
