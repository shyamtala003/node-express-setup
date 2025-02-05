import express from 'express';
import { PORT } from './configs/environment.js';
import logger from './utils/logger.js';
import cors from './middleware/cors.js';
import requestLogger from './middleware/requestLogger.js';

const app = express();

app.use(requestLogger());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.listen(PORT, () => {
  logger.log(`🎸 server is listening on port ${PORT} 🚀`);
});

export default app;
