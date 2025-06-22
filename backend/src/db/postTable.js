import pool from "../config/db.js";

const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS "posts" (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            authorId INTEGER NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
    console.log("Posts table created successfully");
  } catch (error) {
    console.error("Error initializing database:", error.message);
  } finally {
    await pool.end();
  }
};
initDB();
