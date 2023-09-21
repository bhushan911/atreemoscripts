# atreemoscripts

## Installation

Install all the packages using `npm install` using the following command:

```bash
npm install package.json
```

Configuration
Create a config.js file which will have all the database and atreemo credentials and save it under the atreemo directory. Replace the placeholder values in the config.js file with your actual database and access token credentials.

Sample config.js File

```bash
// Database configuration
const databaseConfig = {
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "xyz",
  database: "atreemo",
  charset: "utf8mb4",
};

// Access token credentials
const accessTokenConfig = {
  username: "xyz@jbas",
  password: "xyz",
  grantType: "password",
};

module.exports = {
  databaseConfig,
  accessTokenConfig,
};

```

Usage
Run the main.js file using the following command:

```bash
node main.js
```
