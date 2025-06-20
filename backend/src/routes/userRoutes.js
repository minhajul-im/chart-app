import express from "express";
import {
  getAllUsers,
  storeUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  await getAllUsers(req, res);
});

router.get("/users/:id", async (req, res) => {
  await getUserById(req, res);
});

router.post("/users/store", async (req, res) => {
  await storeUser(req, res);
});

router.patch("/users/update/:id", async (req, res) => {
  await updateUser(req, res);
});

router.delete("/users/delete/:id", async (req, res) => {
  await deleteUser(req, res);
});

export default router;
