import express from 'express';
import { PORT } from './configs/environment.js';
import cors from './middleware/cors.js';
import requestLogger from './middleware/requestLogger.js';
import logger from './utils/logger.js';
import connectioToDB from './configs/dbConnection.js';

const app = express();

app.use(requestLogger());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  return res.json({ message: 'Hello', success: true });
});

app.listen(PORT, async () => {
  logger.log(`🎸 server is listening on port ${PORT} 🚀`);
  await connectioToDB();
});

export default app;
