# atreemoscripts

Install all the packages using npm install using below command

npm install package.json

Create a config.js file which will have all the database & atreemo credentials and save it under atreemo directory

//Sample config.js file
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

Run the main.js file using below command

"node main.js"
