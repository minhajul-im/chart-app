import express from "express";
import { fileUpload } from "../lib/files.js";
import { getAllImages, storeImages } from "../controllers/imageController.js";

const router = express.Router();

router.get("/images", (req, res) => {
  getAllImages(req, res);
});

router.post(
  "/images/store",
  fileUpload.array("images", 10),
  async (req, res) => {
    storeImages(req, res);
  }
);

export default router;
