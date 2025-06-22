import express from "express";
import {
  deletePost,
  getPosts,
  storePost,
} from "../controllers/postController.js";

export const router = express.Router();

router.get("/posts", async (req, res) => {
  await getPosts(req, res);
});

router.post("/posts/store", async (req, res) => {
  await storePost(req, res);
});

router.delete("/posts/:id", async (req, res) => {
  await deletePost(req, res);
});

export default router;
