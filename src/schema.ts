import { gql } from "apollo-server";

export const typeDefs = gql`
  type Player {
    id: ID
    firstName: String
    lastName: String
    height: Int
    weight: Int
    currentTeam: Team
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Team {
    id: ID
    name: String
    location: String
    homeArena: String
  }

  type Query {
    allPlayers: [Player]
    player(id: ID!): Player
    teams: [Team]
    team(id: ID!): Team
  }

  input PlayerCreateInput {
    firstName: String!
    lastName: String!
    height: Int!
    weight: Int!
    currentTeamId: Int
  }

  input TeamCreateInput {
    name: String!
    location: String
    homeArena: String
  }

  type Mutation {
    createPlayer(data: PlayerCreateInput): Player
    createTeam(data: TeamCreateInput): Team
  }

  scalar DateTime
`;
