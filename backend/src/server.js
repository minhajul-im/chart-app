import express from "express";
import logRoutes from "./routes/logRoutes.js";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/v1", logRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
