This was created during my time as a student at [Code Chrysalis](https://www.codechrysalis.io/)

# NBA Players API

## To run the app locally

1. `npm install`
2. `npm run start` or `npm run dev` for the dev environment
3. Access localhost:4000/graphql for the graphql playground

## .env Parameters

```
DATABASE_URL
PORT
```

## Schema

### Player

_A NBA / basketball Player_
|Field|Type|Description|
|----|-----|-------|
|id|Int|Auto-incremented id|
|firstName!|String|Player's first name|
|lastName!|String|Player's last name|
|height|Int|Player's height in centimeters|
|weight|Int|Player's weight in kilograms|
|currentTeam|Team|Player's current team|
|dateOfBirth|DateTime|Player's date of birth|

---

### Team

_A NBA / basketball team_
|Field|Type|Description|
|----|-----|-------|
|id|Int|Auto-incremented id|
|name!|String|Team name|
|abbreviation|String|Team abbreviation (eg: LAL)|
|homeArena|String|Name of home arena|
|players|[Player]|List of current NBA / basketball players|

## Queries

### players

Get all NBA / basketball players

**Return Type**: [[Player]](https://github.com/kome12/nba-players#player)

**Input**: _none_

---

### player

Get one NBA / basketball player by id

**Return Type**: [Player](https://github.com/kome12/nba-players#player)

**Input**: (id: Int!)

---

### playersOnTeamByTeamId

Get NBA / basketball players by team id

**Return Type**: [Player](https://github.com/kome12/nba-players#player)

**Input**: (teamId: Int!)

---

### playersByName

Get NBA / basketball players by name (firstName, lastName)

**Return Type**: [Player](https://github.com/kome12/nba-players#player)

**Input**: (firstName: String!, lastName: String!)

---

### playersByPartialName

Get NBA / basketball players by partial name (name in first or last name)

**Return Type**: [Player](https://github.com/kome12/nba-players#player)

**Input**: (partialName: String!)

---

### teams

Get all NBA / basketball team

**Return Type**: [[Team]](https://github.com/kome12/nba-players#team)

**Input**: _none_

---

### team

Get one NBA / basketball team by id

**Return Type**: [Team](https://github.com/kome12/nba-players#team)

**Input**: (id: Int!)

---

### teamByName

Get one NBA / basketball team by name

**Return Type**: [Team](https://github.com/kome12/nba-players#team)

**Input**: (name: String!)

---

## Mutations

### createPlayer

Create a NBA / basketball player

**Return Type**: [Player](https://github.com/kome12/nba-players#player)

**Input**: (data: [PlayerCreateInput](https://github.com/kome12/nba-players#playercreateinput)!)

---

### updatePlayer

Update a NBA / basketball player by id

**Return Type**: [Player](https://github.com/kome12/nba-players#player)

**Input**: (id: Int!, data: [PlayerUpdateInput](https://github.com/kome12/nba-players#playerupdateinput)!)

---

### deletePlayer

Delete a NBA / basketball player by id

**Return Type**: [Player](https://github.com/kome12/nba-players#player)

**Input**: (id: Int!)

---

### createTeam

Create a NBA / basketball team

**Return Type**: [Team](https://github.com/kome12/nba-players#team)

**Input**: (data: [TeamCreateInput](https://github.com/kome12/nba-players#teamcreateinput)!)

---

### updateTeam

Update a NBA / basketball team by id

**Return Type**: [Team](https://github.com/kome12/nba-players#team)

**Input**: (id: Int!, data: [TeamUpdateInput](https://github.com/kome12/nba-players#teamupdateinput)!)

---

### deleteTeam

Delete a NBA / basketball Team

**Return Type**: [Team](https://github.com/kome12/nba-players#team)

**Input**: (id: Int!)

---

## Inputs

### PlayerCreateInput

| Field         | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| firstName!    | String | Player's first name            |
| lastName!     | String | Player's last name             |
| height        | Int    | Player's height in centimeters |
| weight        | Int    | Player's weight in kilograms   |
| currentTeamId | Int    | Player's current team's id     |

---

### PlayerUpdateInput

| Field         | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| firstName!    | String | Player's first name            |
| lastName!     | String | Player's last name             |
| height        | Int    | Player's height in centimeters |
| weight        | Int    | Player's weight in kilograms   |
| currentTeamId | Int    | Player's current team's id     |

---

### TeamCreateInput

| Field        | Type   | Description                 |
| ------------ | ------ | --------------------------- |
| name!        | String | Team name                   |
| abbreviation | String | Team abbreviation (eg: LAL) |
| homeArena    | String | Name of home arena          |

---

### TeamUpdateInput

| Field        | Type   | Description                 |
| ------------ | ------ | --------------------------- |
| name!        | String | Team name                   |
| abbreviation | String | Team abbreviation (eg: LAL) |
| homeArena    | String | Name of home arena          |
