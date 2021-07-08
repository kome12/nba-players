This was created during my time as a student at [Code Chrysalis] (https://www.codechrysalis.io/)

# NBA Players API

## To run the app locally

1. `npm install`
2. `npm run start` or `npm run dev` for the dev environment
3. Access localhost:4000/graphql for the graphql playground

## .env parameters

```
DATABASE_URL
PORT
```

## Endpoints

### Schema

```
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
```

### Queries
