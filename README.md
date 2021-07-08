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

## Endpoints

### Schema

#### Player

_A NBA / basketball Player_
|Field|Type|Description|
|----|-----|-------|
|id|Int|Auto-incremented id|
|----|-----|-------|
|firstName|String|Player's first name|
|----|-----|-------|
|lastName|String|Player's last name|
|----|-----|-------|
|height|Int|Player's height in centimeters|
|----|-----|-------|
|weight|Int|Player's weight in kilograms|
|----|-----|-------|
|currentTeam|Team|Player's current team|
|----|-----|-------|
|dateOfBirth|DateTime|Player's date of birth|

### Queries
