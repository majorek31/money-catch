# Sky Jumper

## About
It was created just for existance

## API docs
### Create user in database.
user key is being stored in cookies.
may return 200 if successful, 401 if user exists, 400 payload is not correct
`POST /api/login`
```json
{
    "name": "<USERNAME>"
}
```
### Get user points
may return 200 if successful, 404 if logged user is not longer availabe
`GET /api/points`
### Scoreboard
`GET /api/scoreboard`
may only return the scoreboard with 200
###
`POST /api/points`
may return 200 if successful, 404 if logged user is not longer availabe
```json
{
    "points": 100
}
```
returns 'Updated' and 'Not updated' based on status.
