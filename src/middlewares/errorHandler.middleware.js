import logger from '../utils/logger.util.js';
import SendResponse from '../utils/sendResponse.util.js';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  logger.error(err.stack);
  return SendResponse(res, 500, false, 'Something went wrong!😬');
}

/** Simple use case for error handlers
app.get('/error', (req, res, next) => {
  try {
    throw new Error('Something went wrong!');
  } catch (err) {
    next(err); // Pass the error to the global error handler
  }
}); */
