const { Pool } = require("pg");
const { DB } = require("../constants/app.constants");

const pool = new Pool({
  host: DB.HOST,
  port: DB.PORT,
  user: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err.message);
});

const createUrl = async (short, long) => {
  const { rows } = await pool.query(
    "INSERT INTO urls (short, long) VALUES ($1, $2) RETURNING short, long",
    [short, long],
  );
  return rows[0];
};

const findByShort = async (short) => {
  const { rows } = await pool.query(
    "SELECT long FROM urls WHERE short = $1",
    [short],
  );
  return rows[0];
};

module.exports = { pool, createUrl, findByShort };
