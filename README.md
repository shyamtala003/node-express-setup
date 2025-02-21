# Node Express Setup

This project is a basic setup for a Node.js application using Express. It includes configurations for different environments and code formatting tools and about how to overcome usage of unwanted dependencies by thinking how the things work under the hood.

## Project Structure

```
└── 📁node-setup(project name)
    └── 📁src
        └── 📁configs
            └── dbConnection.config.js
            └── environment.config.js
            └── mongooseSchema.config.js
        └── index.js
        └── 📁lib
            └── 📁accounts
                └── accounts.model.js
                └── accounts.routes.js
                └── 📁controllers
                    └── createAccount.controller.js
                    └── login.controller.js
        └── 📁middlewares
            └── cookieParser.middleware.js
            └── cors.middleware.js
            └── requestLogger.middleware.js
        └── router.js
        └── 📁utils
            └── generateToken.util.js
            └── logger.util.js
            └── sendResponse.util.js
            └── setCookie.util.js
            └── setCookie.util.js
            └── sendSlackNotification.util.js
    └── .env
    └── .env.dev
    └── .env.staging
    └── .gitignore
    └── .prettierrc
    └── app.log
    └── eslint.config.cjs
    └── package-lock.json
    └── package.json
    └── README.md
```

## Scripts

- `dev`: Runs the application in development mode with Prettier formatting.
- `staging`: Runs the application in staging mode.
- `production`: Runs the application in production mode.
- `lint`: Runs ESLint to check for code quality issues.

## Environment Variables

- `.env`: Default environment variables.
- `.env.dev`: Development environment variables.
- `.env.staging`: Staging environment variables.

## Dependencies

- `express`: Web framework for Node.js.

## DevDependencies

- `prettier`: Code formatter.
- `eslint`: Linting tool for JavaScript.
- `husky`: Git hooks for automating workflows.
- `lint-staged`: Runs linters on staged Git files.

## Husky and Lint-Staged Configuration

This project uses **Husky** and **lint-staged** to automate code quality checks and formatting before committing code to Git. Here's how it works:

### Husky

Husky is a tool that allows you to easily add Git hooks to your project. In this project, Husky is configured to run `lint-staged` before every commit.

#### Setup

1. Husky is initialized using the `prepare` script in `package.json`:
   ```json
   "scripts": {
     "prepare": "husky install"
   }
   ```
2. A `pre-commit` Git hook is added to the `.husky` directory. This hook runs `lint-staged` before every commit.

### Lint-Staged

Lint-staged runs linters and formatters only on the files that are staged for commit. This ensures that only the relevant files are checked, improving performance.

#### Configuration

The `lint-staged` configuration in `package.json` looks like this:

```json
"lint-staged": {
  "*.js": [
    "eslint --fix", // Fix ESLint issues in staged files
    "prettier --write", // Format staged files with Prettier
    "git add" // Add the fixed files to the commit
  ]
}
```

#### Workflow

1. When you run `git commit`, Husky triggers the `pre-commit` hook.
2. `lint-staged` runs ESLint and Prettier on all staged `.js` files.
3. Any fixes or formatting changes are automatically added to the commit.

## Package Usage Prevention

In this project, we have chosen not to use certain packages such as `morgan`, `cors`, `dotenv`, `body-parser`, and `cookie-parser` for the following reasons:

- **morgan**: Instead of using `morgan` for logging HTTP requests, we have implemented our own custom logging middleware to have more control over the logging format and output.

- **cors**: We handle Cross-Origin Resource Sharing (CORS) manually by setting the appropriate headers in our middleware. This allows us to have more granular control over the CORS configuration.

- **dotenv**: We manage environment variables using a custom configuration module that reads from environment-specific files (`.env`, `.env.dev`, `.env.staging`). This approach helps us avoid the dependency on `dotenv` and provides a more flexible way to manage environment variables.

- **body-parser**: Instead of using `body-parser`, we use the built-in `express.json()` and `express.urlencoded()` middleware for parsing JSON and URL-encoded request bodies. This reduces the number of dependencies and leverages the built-in functionality of Express.

- **cookie-parser**: Instead of using the `cookie-parser` package, we have implemented our own custom `cookieParser` middleware to parse cookies from the request headers. This allows us to have more control over the cookie parsing process and reduces the number of external dependencies.

By avoiding these packages, we aim to reduce the number of external dependencies, improve performance, and have more control over the application's behavior.

## Slack Notification

This project includes a utility for sending notifications to Slack channels. The `sendSlackNotification` utility allows you to send different types of messages (log, info, warn, error) to a specified Slack channel.

### Usage

To use the `sendSlackNotification` utility, import it and call the function with the appropriate parameters:

```javascript
import sendSlackNotification from './utils/sendSlackNotification.util.js';

sendSlackNotification({
  type: 'info',
  title: 'Server Status',
  message: `Server is listening on port ${PORT}`,
  channel: 'general'
});
```

### Configuration

The `sendSlackNotification` utility is configured using environment variables:

- `SLACK_BOT_TOKEN`: The token for the Slack bot.
- `SLACK_CHANNEL_ID`: The default Slack channel ID.

## Usage

1. Install dependencies:

   ```sh
   npm install
   ```

2. Run the application in development mode:

   ```sh
   npm run dev
   ```

3. Run the application in staging mode:

   ```sh
   npm run staging
   ```

4. Run the application in production mode:

   ```sh
   npm run production
   ```

5. Run ESLint to check for code quality issues:
   ```sh
   npm run lint
   ```

## Repository

- [GitHub Repository](https://github.com/shyamtala003/node-express-setup)

## Author

- [Shyam Tala](https://shyamtala.vercel.app/)

## License

- ISC
