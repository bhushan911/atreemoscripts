const axios = require("axios");
const qs = require("querystring");
const { logToFile } = require("./log.js");
const { log } = require("console");

async function post(BearerToken, tableNames) {
  const accessToken = BearerToken;
  const apiUrl = "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/Post";

  //Start date for the data to be posted to the API
  const startDate = "2023-09-01T11:45:37.3794767+01:00";

  // Calculate the start date as today's date minus 3 days
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 3);
  const emailTrendStartDate = currentDate.toISOString(); // Convert to ISO date format

  console.log(`All Tables Start date: ${startDate}`);
  logToFile(`All Tables Start date: ${startDate}`);
  console.log(` Email Trend Start date: ${emailTrendStartDate}`);
  logToFile(`Email Trend Start date: ${emailTrendStartDate}`);

  // Process each table name one by one
  for (const tableName of tableNames) {
    const requestData = {
      TableName: tableName,
      StartDate: startDate, // Modify the start date as needed
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      if (tableName == "EmailTrendFact") {
        requestData.StartDate = emailTrendStartDate;
      }
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
