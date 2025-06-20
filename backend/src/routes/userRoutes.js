import express from "express";
import pool from "../../db.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, createdAt, updatedAt FROM users"
    );
    res.status(200).json({
      status: true,
      code: 200,
      message: "Users fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: "Server error" });
  }
});

export default router;
