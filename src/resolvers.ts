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
    players: (parent: any, args: any, context: Context) => {
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
    playersOnTeamByTeamId: (
      parent: any,
      args: { teamId: number },
      context: Context
    ) => {
      return context.prisma.player.findMany({
        where: {
          currentTeamId: args.teamId,
        },
      });
    },
    playersByName: (
      parent: any,
      args: { firstName: string; lastName: string },
      context: Context
    ) => {
      return context.prisma.player.findMany({
        where: {
          firstName: {
            contains: args.firstName,
            mode: "insensitive",
          },
          lastName: {
            contains: args.lastName,
            mode: "insensitive",
          },
        },
        include: {
          currentTeam: true,
        },
      });
    },
    playersByPartialName: (
      parent: any,
      args: { partialName: string },
      context: Context
    ) => {
      return context.prisma.player.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: args.partialName,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: args.partialName,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          currentTeam: true,
        },
      });
    },
    team: (parent: any, args: { id: number }, context: Context) => {
      return context.prisma.team.findUnique({ where: { id: args.id } });
    },
    teams: (parent: any, args: {}, context: Context) => {
      return context.prisma.team.findMany({
        include: {
          players: true,
        },
      });
    },
    teamByName: (parent: any, args: { name: string }, context: Context) => {
      return context.prisma.team.findUnique({
        where: {
          name: args.name,
        },
        include: {
          players: true,
        },
      });
    },
    teamWithPlayers: (parent: any, args: { id: number }, context: Context) => {
      return context.prisma.team.findUnique({
        where: {
          id: args.id,
        },
        include: {
          players: true,
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
        include: {
          currentTeam: true,
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
        include: {
          currentTeam: true,
        },
      });
    },
    deletePlayer: (parent: any, args: { id: number }, context: Context) => {
      return context.prisma.player.delete({
        where: {
          id: args.id,
        },
        include: {
          currentTeam: true,
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
        include: {
          players: true,
        },
      });
    },
    deleteTeam: (parent: any, args: { id: number }, context: Context) => {
      return context.prisma.team.delete({
        where: {
          id: args.id,
        },
        include: {
          players: true,
        },
      });
    },
  },
  DateTime: DateTimeResolver,
};
