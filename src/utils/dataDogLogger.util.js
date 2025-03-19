import logger from './logger.util.js';
import os from 'os';
import {
  DATADOG_API_KEY,
  DATADOG_REGION
} from '../configs/environment.config.js';

const DATADOG_LOGS_URL = `https://http-intake.logs.${DATADOG_REGION}.datadoghq.com/api/v2/logs`;
const SERVICE_NAME = 'my-node-app';

/**
 * Common function to send logs to Datadog
 * @param {string} level - Log level (info, error, warning, debug)
 * @param {string} message - Log message
 * @param {object} [metadata={}] - Optional metadata (e.g., request details, error stack)
 */
export default async function logToDatadog({
  level,
  message,
  metadata = {}
} = {}) {
  try {
    const logData = [
      {
        ddsource: 'nodejs',
        service: SERVICE_NAME,
        hostname: os.hostname(),
        message,
        level,
        ddtags: 'env:production,app:my-node-app',
        ...metadata
      }
    ];

    const response = await fetch(DATADOG_LOGS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'DD-API-KEY': DATADOG_API_KEY
      },
      body: JSON.stringify(logData)
    });

    if (!response.ok) {
      logger.error(
        `[Datadog] Log failed: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    logger.error(`[Datadog] Failed to send log: ${error.message}`);
  }
}
