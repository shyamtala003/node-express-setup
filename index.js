import express from "express";
import { PORT } from "./configs/environment.js";
import logger from "./utils/logger.js";
import cors from "./middleware/cors.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  logger.log(`🎸 server is listening on port ${PORT} 🚀`);
});

export default app;
