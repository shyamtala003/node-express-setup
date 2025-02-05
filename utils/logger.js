// logger.js

const colors = {
  reset: "\x1b[0m",

  // Text colors
  green: "\x1b[38;2;128;255;128m",
  yellow: "\x1b[38;2;255;227;57m",
  blue: "\x1b[38;2;128;255;255m",
  red: "\x1b[1;38;2;255;128;128m",
};
const formatArgs = (args) =>
  args.map((arg) => {
    return typeof arg === "object" ? `\n${JSON.stringify(arg, null, 2)}` : arg;
  });

const logger = {
  log: (...args) => {
    console.log(`${colors.green}[LOG]  `, ...formatArgs(args));
  },
  info: (...args) => {
    console.info(`${colors.blue}[INFO] `, ...formatArgs(args));
  },
  warn: (...args) => {
    console.warn(`${colors.yellow}[WARN] `, ...formatArgs(args));
  },
  error: (...args) => {
    console.error(`${colors.red}[ERROR]`, ...formatArgs(args));
  },
};

export default logger;
