import express from "express";
import {
  deleteLog,
  getAllLogs,
  storeLog,
  updateLog,
} from "../controllers/logController.js";

const router = express.Router();

router.get("/logs", (req, res) => {
  getAllLogs(req, res);
});

router.post("/logs/store", (req, res, next) => {
  storeLog(req, res, next);
});

router.patch("/logs/update/:id", (req, res, next) => {
  updateLog(req, res, next);
});

router.delete("/logs/delete/:id", async (req, res) => {
  deleteLog(req, res);
});

export default router;
