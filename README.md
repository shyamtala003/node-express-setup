# Node Express Setup

This project is a basic setup for a Node.js application using Express. It includes configurations for different environments and code formatting tools.

## Project Structure

```
node-express-setup/
├── src/
│   └── index.js
├── .env
├── .env.dev
├── .env.staging
├── package.json
└── README.md
```

## Scripts

- `dev`: Runs the application in development mode with Prettier formatting.
- `staging`: Runs the application in staging mode.
- `production`: Runs the application in production mode.

## Environment Variables

- `.env`: Default environment variables.
- `.env.dev`: Development environment variables.
- `.env.staging`: Staging environment variables.

## Dependencies

- `express`: Web framework for Node.js.

## DevDependencies

- `prettier`: Code formatter.

## Package Usage Prevention

In this project, we have chosen not to use certain packages such as `morgan`, `cors`, `dotenv`, and `body-parser` for the following reasons:

- **morgan**: Instead of using `morgan` for logging HTTP requests, we have implemented our own custom logging middleware to have more control over the logging format and output.

- **cors**: We handle Cross-Origin Resource Sharing (CORS) manually by setting the appropriate headers in our middleware. This allows us to have more granular control over the CORS configuration.

- **dotenv**: We manage environment variables using a custom configuration module that reads from environment-specific files (`.env`, `.env.dev`, `.env.staging`). This approach helps us avoid the dependency on `dotenv` and provides a more flexible way to manage environment variables.

- **body-parser**: Instead of using `body-parser`, we use the built-in `express.json()` and `express.urlencoded()` middleware for parsing JSON and URL-encoded request bodies. This reduces the number of dependencies and leverages the built-in functionality of Express.

By avoiding these packages, we aim to reduce the number of external dependencies, improve performance, and have more control over the application's behavior.

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

## Repository

- [GitHub Repository](https://github.com/shyamtala003/node-express-setup)

## Author

- Shyam Tala

## License

- ISC
