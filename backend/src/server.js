import cors from "cors";
import express from "express";

import logRoutes from "./routes/logRoutes.js";
import monitorRoutes from "./routes/monitorRoutes.js";
import { storeMonitor } from "./controllers/monitorController.js";
import { validateHeaders } from "./middlewares/headerValidator.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

storeMonitor();

app.use(validateHeaders);

app.use("/v1/api", logRoutes);
app.use("/v1/api", monitorRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
