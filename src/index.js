import express from 'express';
import { PORT } from './configs/environment.config.js';
import cors from './middlewares/cors.middleware.js';
import requestLogger from './middlewares/requestLogger.middleware.js';
import logger from './utils/logger.util.js';
import connectioToDB from './configs/dbConnection.config.js';
import router from './router.js';
import cookieParser from './middlewares/cookieParser.middleware.js';

const app = express();

app.use(requestLogger());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser);

app.use('/api', router);

app.listen(PORT, async () => {
  logger.log(`🎸 server is listening on port ${PORT} 🚀`);
  await connectioToDB();
});

export default app;
