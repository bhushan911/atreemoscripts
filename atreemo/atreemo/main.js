const axios = require("axios");
const axiosRetry = require("axios-retry");
const mysql = require("mysql2");
delete require.cache[require.resolve("./insertqueries.js")];
const queries = require("./insertqueries.js");
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
  getPushNotificationsTrendFact,
  getSMSTrendFact,
  getVouchersFact,
  getLeadsFact,
} = require("./api.js");
const { post } = require("./post.js");
const { accessTokenConfig } = require("./config.js");

let BearerToken = null;

const tableNames = [
  // "BookingsFact",
  "ContactDetailsFact",
  // "TransactionsFact",
  // "ContactPreferencesFact",
  // "ContactsSourcesFact",
  "EmailTrendFact",
  // "LoyaltyPointsFact",
  "VisitsFact",
  // "PushNotificationsTrendFact",
  // "SMSTrendFact",
  // "VouchersFact",
  // "LeadsFact",
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
    console.log("DB Connection Open:");

    // await getBookingsFact(BearerToken, connection, "insertBookingsFact");
    // // Repeat this pattern for other API functions
    await getContactDetailsFact(
      BearerToken,
      connection,
      "insertContactDetailsFact"
    );
    // await getTransactionsFact(
    //   BearerToken,
    //   connection,
    //   "insertTransactionsFact"
    // );
    // await getContactPreferencesFact(
    //   BearerToken,
    //   connection,
    //   "insertContactPreferencesFact"
    // );
    // await getContactSourcesFact(
    //   BearerToken,
    //   connection,
    //   "insertContactSourcesFact"
    // );
    await getEmailTrendFact(BearerToken, connection, "insertEmailTrendFact");
    await getLoyaltyPointsFact(
      BearerToken,
      connection,
      "insertLoyaltyPointsFact"
    );
    await getVisitsFact(BearerToken, connection, "insertVisitsFact");
    await getPushNotificationsTrendFact(
      BearerToken,
      connection,
      "insertPushNotificationsTrendFact"
    );
    // await getSMSTrendFact(BearerToken, connection, "insertSMSTrendFact");
    // await getVouchersFact(BearerToken, connection, "insertVouchersFact");
    // await getLeadsFact(BearerToken, connection, "insertLeadsFact");

    // Call other functions for remaining endpoints
    console.log("Data from all API endpoints has been saved to the database.");
    logToFile("Data from all API endpoints has been saved to the database.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (connection) {
      connection.end();
      console.log("DB connection closed");
      logToFile("DB connection closed");
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
