import express from 'express';
import { PORT } from './src/configs/environment.js';
import cors from './src/middleware/cors.js';
import requestLogger from './src/middleware/requestLogger.js';
import logger from './src/utils/logger.js';

const app = express();

app.use(requestLogger());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.listen(PORT, () => {
  logger.log(`🎸 server is listening on port ${PORT} 🚀`);
});

export default app;
