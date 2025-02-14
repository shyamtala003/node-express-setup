import fs from 'fs';
import path from 'path';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[38;2;128;255;128m',
  yellow: '\x1b[38;2;255;227;57m',
  blue: '\x1b[38;2;128;255;255m',
  red: '\x1b[1;38;2;255;128;128m',
};

const logFilePath = path.join(process.cwd(), 'app.log');
let enableFileLogging = true;

const formatArgs = (args) =>
  args.map((arg) =>
    typeof arg === 'object' ? `\n${JSON.stringify(arg, null, 2)}` : arg
  );

const writeToLogFile = (level, message) => {
  if (!enableFileLogging) return;

  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error(`${colors.red}[ERROR] Failed to write to log file:`, err);
    }
  });
};

const logger = {
  log: (...args) => {
    const message = formatArgs(args).join(' ');
    console.log(`${colors.green}[LOG]  `, ...formatArgs(args));
    writeToLogFile('LOG', message);
  },
  info: (...args) => {
    const message = formatArgs(args).join(' ');
    console.info(`${colors.blue}[INFO] `, ...formatArgs(args));
    writeToLogFile('INFO', message);
  },
  warn: (...args) => {
    const message = formatArgs(args).join(' ');
    console.warn(`${colors.yellow}[WARN] `, ...formatArgs(args));
    writeToLogFile('WARN', message);
  },
  error: (...args) => {
    const message = formatArgs(args).join(' ');
    console.error(`${colors.red}[ERROR]`, ...formatArgs(args));
    writeToLogFile('ERROR', message);
  },

  setConfig: ({ enableFileLogging: loggingEnabled }) => {
    if (typeof loggingEnabled === 'boolean') {
      enableFileLogging = loggingEnabled;
    }
  },
};

export default logger;
