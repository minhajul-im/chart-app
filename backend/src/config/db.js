import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myapp",
  password: "minhaj",
  port: 5432,
});

export default pool;
