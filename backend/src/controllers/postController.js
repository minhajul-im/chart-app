import pool from "../config/db.js";
import { postSchema } from "../validations/postShema.js";

export const getPosts = async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT * FROM posts
    `);
    console.log("Posts fetched successfully:", result.rows);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Posts fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Server error",
      errors: ["Server Error!"],
    });
  }
};

export const storePost = async (req, res) => {
  const { value, error } = postSchema.validate(req.body);
  const { title, content, authorId } = value;

  if (error) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Validation error",
      errors: error.details.map((err) => err.message),
    });
  }
  try {
    const userResult = await pool.query(
      `SELECT id, username, email FROM users WHERE id = $1`,
      [authorId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "Author not found",
        errors: ["Author does not exist"],
      });
    }

    const postResult = await pool.query(
      `
      INSERT INTO posts (title, content, authorId) 
      VALUES ($1, $2, $3) RETURNING *`,
      [title, content, authorId]
    );

    const post = postResult.rows[0];
    const author = userResult.rows[0];

    const result = {
      ...post,
      author,
    };

    return res.status(201).json({
      status: true,
      code: 201,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Server error",
      errors: ["Server Error!"],
    });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    return res.status(400).json({
      status: false,
      code: 400,
      message: "Post ID is required",
      errors: ["Post ID is required"],
    });
  }

  try {
    const result = await pool.query(
      `DELETE FROM posts WHERE id = $1 RETURNING *`,
      [postId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: false,
        code: 404,
        message: "Post not found",
        errors: ["Post does not exist"],
      });
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Post deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return res.status(500).json({
      status: false,
      code: 500,
      message: "Server error",
      errors: ["Server Error!"],
    });
  }
};
