import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({
    host: Deno.env.get("DATABASE_HOST"),
    database: Deno.env.get("DATABASE_DB"),
    username: Deno.env.get("DATABASE_USER"),
    password: Deno.env.get("DATABASE_PASSWORD"),
    port: 5432,
    ssl: true,
    max: 3, // use at most 3 concurrent connections
    connectionTimeoutMillis: 90000 // set the connection timeout to 30 seconds
  });
}

export { sql };
