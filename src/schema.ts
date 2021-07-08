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
    playersOnTeamByTeamId(id: Int!): [Player]
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
    firstName: String!
    lastName: String!
    height: Int
    weight: Int
    currentTeamId: Int
  }

  input TeamCreateInput {
    name: String!
    abbreviation: String
    location: String
    homeArena: String
  }

  input TeamUpdateInput {
    name: String!
    abbreviation: String
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
