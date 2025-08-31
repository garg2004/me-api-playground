import pg from "pg";
const { Pool } = pg;

console.log("Connecting to DB:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // required on Render
});

export default pool;
