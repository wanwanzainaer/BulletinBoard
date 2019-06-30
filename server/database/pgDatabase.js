const keys = require("../config/keys");
const { Pool } = require("pg");

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("error", () => console.log("Lost PG connection"));

// pgClient.query("DROP TABLE users");
pgClient
  .query(
    "CREATE TABLE IF NOT EXISTS users(email VARCHAR(320) NOT NULL UNIQUE, password CHAR(60) NOT NULL)"
  )
  .catch(err => console.log(err));

module.exports = pgClient;
