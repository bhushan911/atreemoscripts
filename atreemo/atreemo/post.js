const axios = require("axios");
const qs = require("querystring");
const { logToFile } = require("./log.js");

async function post(BearerToken, tableNames) {
  const accessToken = BearerToken;
  const apiUrl = "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/Post";

  // Process each table name one by one
  for (const tableName of tableNames) {
    const requestData = {
      TableName: tableName,
      StartDate: "2023-09-01T11:45:37.3794767+01:00", // Modify the start date as needed
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.post(apiUrl, requestData, { headers });
      console.log(`Data for table '${tableName}' has been posted.`);
      logToFile(`Data for table '${tableName}' has been posted.`);
      console.log(response.data); // Process the response data here
      logToFile(`Response Data : ${response.data}`);
    } catch (error) {
      console.error(`Error posting data for table '${tableName}':`, error);
      logToFile(`Error posting data for table ${tableName} : ${error}`);
    }
  }
}

module.exports = {
  post,
};
