import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './configs/environment.config.js';
import cors from './middlewares/cors.middleware.js';
import requestLogger from './middlewares/requestLogger.middleware.js';
import logger from './utils/logger.util.js';
import connectioToDB from './configs/dbConnection.config.js';
import router from './router.js';
import cookieParser from './middlewares/cookieParser.middleware.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import SendResponse from './utils/sendResponse.util.js';

const app = express();

app.use(requestLogger());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser);

app.use('/api', router);

app.use(errorHandler);

app.use((req, res) => {
  return SendResponse(
    res,
    404,
    false,
    `404 - Route Not Found: ${req.originalUrl}`
  );
});
app.get('/favicon.ico', (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  res.sendFile(path.join(__dirname, '../public', 'favicon.png'));
});

app.listen(PORT, async () => {
  logger.log(`🎸 server is listening on port ${PORT} 🚀`);
  await connectioToDB();
});

export default app;
