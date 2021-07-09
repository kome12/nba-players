import { gql } from "apollo-server";

export const typeDefs = gql`
  """
  A NBA / basketball Player
  """
  type Player {
    """
    Auto-incremented id
    """
    id: Int
    """
    Player's first name
    """
    firstName: String
    """
    Player's last name
    """
    lastName: String
    """
    Player's height in centimeters
    """
    height: Int
    """
    Player's weight in kilograms
    """
    weight: Int
    """
    Player's current team
    """
    currentTeam: Team
    """
    Player's date of birth
    """
    dateOfBirth: DateTime
    createdAt: DateTime
    updatedAt: DateTime
  }

  """
  A NBA / basketball team
  """
  type Team {
    """
    Auto-incremented id
    """
    id: Int
    """
    Team name
    """
    name: String
    """
    Team abbreviation (eg: LAL)
    """
    abbreviation: String
    """
    Name of home arena
    """
    homeArena: String
    """
    List of current NBA / basketball players
    """
    players: [Player]
  }

  type Query {
    """
    Get all NBA / basketball players
    """
    players: [Player]
    """
    Get one NBA / basketball player by id
    """
    player(id: Int!): Player
    """
    Get NBA / basketball players by team id
    """
    playersOnTeamByTeamId(teamId: Int!): [Player]
    """
    Get NBA / basketball players by name (firstName, lastName)
    """
    playersByName(firstName: String!, lastName: String!): [Player]
    """
    Get NBA / basketball players by partial name (name in first or last name)
    """
    playersByPartialName(partialName: String!): [Player]
    """
    Get all NBA / basketball team
    """
    teams: [Team]
    """
    Get one NBA / basketball team by id
    """
    team(id: Int!): Team
    """
    Get one NBA / basketball team by name
    """
    teamByName(name: String!): Team
    """
    Get one NBA / basketball team with players by team id
    """
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
    firstName: String
    lastName: String
    height: Int
    weight: Int
    currentTeamId: Int
  }

  input TeamCreateInput {
    name: String!
    abbreviation: String
    homeArena: String
  }

  input TeamUpdateInput {
    name: String
    abbreviation: String
    homeArena: String
  }

  type Mutation {
    """
    Create a NBA / basketball player
    """
    createPlayer(data: PlayerCreateInput!): Player
    """
    Update a NBA / basketball player by id
    """
    updatePlayer(id: Int!, data: PlayerUpdateInput!): Player
    """
    Delete a NBA / basketball player by id
    """
    deletePlayer(id: Int!): Player
    """
    Create a NBA / basketball team
    """
    createTeam(data: TeamCreateInput!): Team
    """
    Update a NBA / basketball team by id
    """
    updateTeam(id: Int!, data: TeamUpdateInput!): Team
    """
    Delete a NBA / basketball Team
    """
    deleteTeam(id: Int!): Team
  }

  scalar DateTime
`;
