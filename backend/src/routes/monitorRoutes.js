import express from "express";
import { getAllMonitors } from "../controllers/monitorController.js";

export const router = express.Router();

router.get("/monitors", (req, res) => {
  getAllMonitors(req, res);
});

export default router;
