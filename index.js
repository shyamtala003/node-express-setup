import express from "express";
import { PORT } from "./configs/environment.js";
import logger from "./utils/logger.js";

const app = express();

app.listen(PORT, () => {
  logger.log(`🎸 server is listening on port ${PORT} 🚀`);
});

export default app;
