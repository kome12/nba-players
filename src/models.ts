// PLAYER
export interface Player {
  id?: number;
  firstName: string;
  lastName: string;
  height?: number;
  weight?: number;
  currentTeam?: Team;
  currentTeamId?: number;
  dateOfBirth?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlayerCreateInput {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  currentTeamId: number;
}

export interface PlayerUpdateInput {
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  currentTeamId: number;
}

// TEAM
export interface Team {
  id: number;
  name: string;
}

export interface TeamCreateInput {
  name: string;
  location: string;
  homeArena: string;
}

export interface TeamUpdateInput {
  name: string;
}
