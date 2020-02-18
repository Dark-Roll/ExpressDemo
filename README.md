# Express Demo

## How to start?
- yarn install
- yarn start
See http://localhost:3000/[http://localhost:3000/], DB data will show here.

**Before you running this project, make sure database is already running and have updated the connection information which can be found in app.js**, like below:

```
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test"
});
```

## Caveat and tips

Can use Ampps to start a local DB.

Below is the primary router:
/
/users

