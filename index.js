import express from "express";
import { PORT } from "./configs/environment.js";

const app = express();

app.listen(PORT, () => {
  console.log(`🎸 server is listening on port ${PORT} 🚀`);
});

export default app;
