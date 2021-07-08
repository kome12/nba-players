import { gql } from "apollo-server";

export const typeDefs = gql`
  type Player {
    id: Int
    firstName: String
    lastName: String
    height: Int
    weight: Int
    currentTeam: Team
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Team {
    id: Int
    name: String
    location: String
    homeArena: String
    players: [Player]
  }

  type Query {
    allPlayers: [Player]
    player(id: Int!): Player
    playersOnTeamByTeamId(id: Int!): [Player]
    teams: [Team]
    team(id: Int!): Team
    teamByName(name: String!): Team
    teamWithPlayers(id: Int!): Team
  }

  input PlayerCreateInput {
    firstName: String!
    lastName: String!
    height: Int
    weight: Int
    currentTeamId: Int
  }

  input PlayerUpdateInput {
    firstName: String!
    lastName: String!
    height: Int
    weight: Int
    currentTeamId: Int
  }

  input TeamCreateInput {
    name: String!
    location: String
    homeArena: String
  }

  input TeamUpdateInput {
    name: String!
    locaton: String
    homeArena: String
  }

  type Mutation {
    createPlayer(data: PlayerCreateInput): Player
    updatePlayer(id: Int, data: PlayerUpdateInput): Player
    deletePlayer(id: Int): Player
    createTeam(data: TeamCreateInput): Team
    updateTeam(id: Int, data: TeamUpdateInput): Team
    deleteTeam(id: Int): Team
  }

  scalar DateTime
`;
