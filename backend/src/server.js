import cors from "cors";
import express from "express";
import path from "path";

import logRoutes from "./routes/logRoutes.js";
import monitorRoutes from "./routes/monitorRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { multerFileError } from "./errors/multer.js";
import { storeMonitor } from "./controllers/monitorController.js";
import { validateHeaders } from "./middlewares/headerValidator.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

storeMonitor();

app.use("/v1/api", validateHeaders);

app.use("/assets", express.static(path.join(process.cwd(), "uploads")));

app.use("/v1/api/auth", authRoutes);

app.use("/v1/api", authMiddleware, logRoutes);
app.use("/v1/api", authMiddleware, monitorRoutes);
app.use("/v1/api", authMiddleware, imageRoutes);

app.use(multerFileError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
