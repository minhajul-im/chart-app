import bcrypt from "bcrypt";

import pool from "../config/db.js";
import {
  userStoreSchema,
  userUpdateSchema,
} from "../validations/userSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, email, createdAt, updatedAt FROM "users"
      ORDER BY createdAt DESC
      `
    );
    res.status(200).json({
      status: true,
      code: 200,
      message: "Users fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Server error",
      errors: ["Server Error!"],
    });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "User ID is required",
      errors: ["User ID is required"],
    });
  }

  try {
    const result = await pool.query(
      `
      SELECT id, username, email, createdAt, updatedAt FROM "users"
      WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "User not found",
        errors: ["User not found"],
      });
    }

    res.status(200).json({
      status: true,
      code: 200,
      message: "User fetched successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Server error",
      errors: ["Server Error!"],
    });
  }
};

export const storeUser = async (req, res) => {
  const { error, value } = userStoreSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  const { username, email, password } = value;

  try {
    const userExists = await pool.query(
      `
      SELECT 1 FROM users 
      WHERE email = $1 OR username = $2`,
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        status: false,
        code: 400,
        errors: ["Email or username already exists"],
        message: "Email or username already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO "users" (username, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id, username, email, createdAt, updatedAt`,
      [username, email, hashedPassword]
    );
    res.status(201).json({
      status: true,
      code: 201,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Server error",
      errors: ["Server Error!"],
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const { error, value } = userUpdateSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }
  const { username, email } = value;

  const fields = [];
  const values = [];
  let idx = 1;

  if (username) {
    fields.push(`username = $${idx++}`);
    values.push(username);
  }

  if (email) {
    fields.push(`email = $${idx++}`);
    values.push(email);
  }

  if (fields.length === 0) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "No data provided to update",
    });
  }

  fields.push(`updatedAt = CURRENT_TIMESTAMP`);
  const query = `
    UPDATE users 
    SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING id, username, email, createdAt, updatedAt
  `;
  values.push(id);

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "User not found",
        errors: ["User not found"],
      });
    }

    res.status(200).json({
      status: true,
      code: 200,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Server error",
      errors: ["Server Error!"],
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "User ID is required",
      errors: ["User ID is required"],
    });
  }

  try {
    const result = await pool.query(
      `
      DELETE FROM "users" 
      WHERE id = $1 
      RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "User not found",
        errors: ["User not found"],
      });
    }

    res.status(200).json({
      status: true,
      code: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      message: "Server error",
      errors: ["Server Error!"],
    });
  }
};
