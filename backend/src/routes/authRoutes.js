import express from "express";

import {
  forgotPassword,
  resetPassword,
  signInUser,
  signUpUser,
} from "../controllers/authController.js";

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

export default router;
