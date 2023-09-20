const axios = require("axios");
const mysql = require("mysql2");
const { databaseConfig } = require("./config.js");
const qs = require("querystring");
const { logToFile } = require("./log.js");
const {
  getBookingsFact,
  getContactDetailsFact,
  getTransactionsFact,
  getContactPreferencesFact,
  getContactSourcesFact,
  getEmailTrendFact,
  getLoyaltyPointsFact,
  getVisitsFact,
} = require("./test_script.js");
const { post } = require("./post.js");
const { accessTokenConfig } = require("./config.js");

let BearerToken = null;

const tableNames = [
  "BookingsFact",
  "ContactDetailsFact",
  "TransactionsFact",
  "ContactPreferencesFact",
  "ContactsSourcesFact",
  "EmailTrendFact",
  "LoyaltyPointsFact",
  "VisitsFact",
  //   "PushNotificationsTrendFact",
  //   "SMSTrendFact",
  //   "VouchersFact",
  //   "LeadsFact",
];

const getAccessToken = async () => {
  const apiUrl = "https://atreemo.updates.thedrg.co.uk/token";

  const { username, password, grantType } = accessTokenConfig;
  const formData = {
    username,
    password,
    grant_type: grantType,
  };

  const encodedFormData = qs.stringify(formData);

  try {
    const response = await axios.post(apiUrl, encodedFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Set the Content-Type header
      },
    });

    BearerToken = response.data.access_token;
    console.log("BearerToken Created:", BearerToken);
    logToFile(`BearerToken Created: ${BearerToken}`);

    return BearerToken;
  } catch (error) {
    throw error;
  }
};

// Call the functions to fetch and save data from all API endpoints
async function fetchAndSaveDataFromAllEndpoints() {
  let connection;
  try {

     connection = mysql.createConnection(databaseConfig);

    // Connect to the database
    await connection.promise().connect();


    await getBookingsFact(BearerToken,connection);
    await getContactDetailsFact(BearerToken,connection);
    await getTransactionsFact(BearerToken,connection);
    await getContactPreferencesFact(BearerToken,connection);
    await getContactSourcesFact(BearerToken,connection);
    await getEmailTrendFact(BearerToken,connection);
    await getLoyaltyPointsFact(BearerToken,connection);
    await getVisitsFact(BearerToken,connection);

    // Call other functions for remaining endpoints
    console.log("Data from all API endpoints has been saved to the database.");
    logToFile("Data from all API endpoints has been saved to the database.");
  } catch (error) {
    console.error("Error:", error);
  } finally{
    if(connection){
      connection.end();
      console.log("DB connection closed");
      logToFile("DB connection closed")
    }

  }
 
}
// Call the main function to start fetching and saving data

const executeScript = async () => {
  logToFile("Script started");
  await getAccessToken();
  await post(BearerToken, tableNames);
  await fetchAndSaveDataFromAllEndpoints();
  logToFile("Script finished");
};

// Call the main function to start executing the script
executeScript().catch((error) => {
  console.error("Script error:", error);
});
