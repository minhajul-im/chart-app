import express from "express";

import {
  forgotPassword,
  resetPassword,
  signInUser,
  signOut,
  signUpUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  await signUpUser(req, res);
});

router.post("/signin", async (req, res) => {
  await signInUser(req, res);
});

router.post("/forgot-password", async (req, res) => {
  await forgotPassword(req, res);
});

router.post("/reset-password", async (req, res) => {
  await resetPassword(req, res);
});

router.get("/signout", (req, res, next) => {
  signOut(req, res, next);
});

export default router;
