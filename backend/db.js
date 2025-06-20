import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myapp",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;
