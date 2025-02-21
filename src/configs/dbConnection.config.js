import mongoose from 'mongoose';
import { MONGODB_URI } from './environment.config.js';
import logger from '../utils/logger.util.js';

export default async function connectioToDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.log('🥁 Database connected successfully 🚀');
  } catch (error) {
    logger.error('Database connection failed', error);
  }
}
