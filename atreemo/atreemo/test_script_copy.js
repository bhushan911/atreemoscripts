const axios = require("axios");
const mysql = require("mysql2");
delete require.cache[require.resolve("./insertqueries.js")];
const queries = require("./insertqueries.js");
const { databaseConfig } = require("./config.js");
const { logToFile } = require("./log.js");
const { log } = require("console");
const axiosRetry = require("axios-retry");
let count = 0;

async function getBookingsFact(BearerToken, connection, queryName) {
  const accessToken = BearerToken;
  const apiUrl =
    "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/GetBookingsFact";
  let retryCount = 5;
  // Configure axios to automatically retry requests on certain HTTP errors
  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });
  // const connection = mysql.createConnection(databaseConfig);

  try {
    // await connection.connect();
    while (retryCount > 0) {
      // while (true) {
      let data = [];

      const response = await axios.get(`${apiUrl}?pageSize=*`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;
      // console.log("responseData :", responseData);
      // console.log("responseData.response :", responseData.Response);
      if (!responseData || !responseData.Response) {
        console.log(
          "GetBookingsFact API response does not contain valid data."
        );
        logToFile(`GetBookingsFact API response does not contain valid data.`);

        break; // Exit the loop if the response is not valid
      }

      data = data.concat(responseData.BookingsFact);
      // console.log("data length :", data.length);

      if (data.length === 0) {
        console.log("No more data retrieved from the GetBookingsFact API.");
        logToFile(`No more data retrieved from the GetBookingsFact API.`);
        break; // Exit the loop when no more data is retrieved
      }

      // Assuming 'data' is an array of objects obtained from the API
      // Save data to MySQL database
      const insertQuery = queries[queryName];
      if (!insertQuery) {
        throw new Error(`Query name '${insertQuery}' not found in queries.`);
      }

      const values = data.map((item) => [
        item.BookingsFactID,
        item.BookingID,
        item.CtcID,
        item.BookingDateTime,
        item.VistDateTime,
        item.StatusID,
        item.Status,
        item.Source,
        item.EstimatedValue,
        item.SiteID,
        item.SiteName,
        item.Covers,
        item.ModifiedDate,
      ]);

      connection.query(insertQuery, [values]);

      console.log(
        count + " Data has been fetched and saved to the BookingsFact Table."
      );
      logToFile(
        `${count} Data has been fetched and saved to the BookingsFact Table.`
      );
      count++;
      // }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Retrying ${retryCount}`);
    logToFile(`Retrying ${retryCount}`);
    retryCount--;
    if (retryCount === 0) {
      throw error; // If retries exhausted, throw the error
    }
    // Sleep for a while before retrying (optional)
    await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds
  } finally {
    // connection.end();
    count = 0;
  }
}

async function getContactDetailsFact(BearerToken, connection, queryName) {
  const accessToken = BearerToken;
  const apiUrl =
    "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/GetContactDetailsFact";
  let retryCount = 5;

  // Configure axios to automatically retry requests on certain HTTP errors
  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  try {
    while (retryCount > 0) {
      // while (true) {
      let data = [];

      const response = await axios.get(`${apiUrl}?pageSize=*`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;

      if (!responseData || !responseData.Response) {
        console.log(
          "GetContactDetailsFact API response does not contain valid data."
        );
        logToFile(
          `GetContactDetailsFact API response does not contain valid data.`
        );
        break; // Exit the loop if the response is not valid
      }

      data = data.concat(responseData.ContactDetailsFacts);
      // console.log("data length :", data.length);

      if (data.length === 0) {
        console.log(
          "No more data retrieved from the GetContactDetailsFact API."
        );
        logToFile(`No more data retrieved from the GetContactDetailsFact API.`);
        break; // Exit the loop when no more data is retrieved
      }

      // Assuming 'data' is an array of objects obtained from the API
      // Save data to MySQL database
      const insertQuery = queries[queryName];

      const values = data.map((item) => [
        item.ContactDetailsFactID,
        item.CtcID,
        item.Gender,
        item.BirthDateYear,
        item.BirthdateMonth,
        item.PostCodeSector,
        item.FavouriteSiteID,
        item.FavouriteSite,
        item.CreateDate,
        item.SourceID,
        item.PointBalance,
        item.CorporateName,
        item.TiersName,
        item.Deleted,
        item.ModifiedDate,
      ]);

      connection.query(insertQuery, [values]);

      console.log(
        count +
          " Data has been fetched and saved to the ContactDetailsFact Table."
      );
      logToFile(
        `${count} Data has been fetched and saved to the ContactDetailsFact Table.`
      );
      count++;
      // }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Retrying ${retryCount}`);
    logToFile(`Retrying ${retryCount}`);
    retryCount--;
    if (retryCount === 0) {
      throw error; // If retries exhausted, throw the error
    }
    // Sleep for a while before retrying (optional)
    await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds
  } finally {
    // connection.end();
    count = 0;
  }
}

async function getTransactionsFact(BearerToken, connection, queryName) {
  const accessToken = BearerToken;
  const apiUrl =
    "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/GetTransactionsFact";
  let retryCount = 5;

  // Configure axios to automatically retry requests on certain HTTP errors
  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  try {
    while (retryCount > 0) {
      // while (true) {
      let data = [];

      const response = await axios.get(`${apiUrl}?pageSize=*`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;

      if (!responseData || !responseData.Response) {
        console.log(
          "GetTransactionsFact API response does not contain valid data."
        );
        logToFile(
          `GetTransactionsFact API response does not contain valid data.`
        );
        break; // Exit the loop if the response is not valid
      }

      data = data.concat(responseData.TransactionsFacts);
      // console.log("data length :", data.length);

      if (data.length === 0) {
        console.log("No more data retrieved from the GetTransactionsFact API.");
        logToFile(`No more data retrieved from the GetTransactionsFact API.`);
        break; // Exit the loop when no more data is retrieved
      }

      // Assuming 'data' is an array of objects obtained from the API
      // Save data to MySQL database
      const insertQuery = queries[queryName];

      const values = data.map((item) => [
        item.TransactionsFactID,
        item.CtcID,
        item.VoucherCode,
        item.SiteID,
        item.SiteName,
        item.OrderDate,
        item.TotalSpend,
        item.OrderType,
        item.OrderStatus,
        item.AmountPaid,
        item.DiscountAmount,
        item.SaleType,
        item.OrderID,
        item.OrderChannel,
        item.Source,
        item.PaidWithPoints,
        item.ModifiedDate,
        item.OrderUniqueID,
      ]);

      connection.query(insertQuery, [values]);

      console.log(
        count +
          " Data has been fetched and saved to the TransactionsFact Table."
      );
      logToFile(
        `${count} Data has been fetched and saved to the TransactionsFact Table.`
      );
      count++;
      // }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Retrying ${retryCount}`);
    logToFile(`Retrying ${retryCount}`);
    retryCount--;
    if (retryCount === 0) {
      throw error; // If retries exhausted, throw the error
    }
    // Sleep for a while before retrying (optional)
    await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds
  } finally {
    // connection.end();
    count = 0;
  }
}

async function getContactPreferencesFact(BearerToken, connection, queryName) {
  const accessToken = BearerToken;
  const apiUrl =
    "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/GetContactPreferencesFact";
  let retryCount = 5;

  // Configure axios to automatically retry requests on certain HTTP errors
  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  try {
    while (retryCount > 0) {
      // while (true) {
      let data = [];

      const response = await axios.get(`${apiUrl}?pageSize=*`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;

      if (!responseData || !responseData.Response) {
        console.log(
          "GetContactPreferencesFact API response does not contain valid data."
        );
        logToFile(
          `GetContactPreferencesFact API response does not contain valid data.`
        );
        break; // Exit the loop if the response is not valid
      }

      data = data.concat(responseData.ContactPreferencesFacts);
      // console.log("data length :", data.length);

      if (data.length === 0) {
        console.log(
          "No more data retrieved from the GetContactPreferencesFact API."
        );
        logToFile(
          `No more data retrieved from the GetContactPreferencesFact API.`
        );
        break; // Exit the loop when no more data is retrieved
      }

      // Assuming 'data' is an array of objects obtained from the API
      // Save data to MySQL database
      const insertQuery = queries[queryName];

      const values = data.map((item) => [
        item.ContactPreferencesFactID,
        item.CtcID,
        item.BrandName,
        item.Preferences,
        item.WebPushOptin,
        item.PushOptin,
        item.EmailOptin,
        item.MailOptin,
        item.PhoneOptin,
        item.SMSOptin,
        item.ModifiedDate,
      ]);

      connection.query(insertQuery, [values]);

      console.log(
        count +
          " Data has been fetched and saved to the ContactPreferencesFact Table."
      );
      logToFile(
        `${count} Data has been fetched and saved to the ContactPreferencesFact Table.`
      );
      count++;
      // }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Retrying ${retryCount}`);
    logToFile(`Retrying ${retryCount}`);
    retryCount--;
    if (retryCount === 0) {
      throw error; // If retries exhausted, throw the error
    }
    // Sleep for a while before retrying (optional)
    await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds
  } finally {
    // connection.end();
    count = 0;
  }
}

async function getContactSourcesFact(BearerToken, connection, queryName) {
  const accessToken = BearerToken;
  const apiUrl =
    "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/GetContactSourcesFact";
  let retryCount = 5;

  // Configure axios to automatically retry requests on certain HTTP errors
  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  try {
    while (retryCount > 0) {
      // while (true) {
      let data = [];

      const response = await axios.get(`${apiUrl}?pageSize=*`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;

      if (!responseData || !responseData.Response) {
        console.log(
          "GetContactSourcesFact API response does not contain valid data."
        );
        logToFile(
          `GetContactSourcesFact API response does not contain valid data.`
        );
        break; // Exit the loop if the response is not valid
      }

      data = data.concat(responseData.ContactsSourcesFacts);
      // console.log("data length :", data.length);

      if (data.length === 0) {
        console.log(
          "No more data retrieved from the GetContactSourcesFact API."
        );
        logToFile(`No more data retrieved from the GetContactSourcesFact API.`);
        break; // Exit the loop when no more data is retrieved
      }

      // Assuming 'data' is an array of objects obtained from the API
      // Save data to MySQL database
      const insertQuery = queries[queryName];

      const values = data.map((item) => [
        item.ContactsSourcesFactID,
        item.CtcID,
        item.SourceID,
        item.OriginID,
        item.BrandName,
        item.ModifiedDate,
      ]);

      connection.query(insertQuery, [values]);

      console.log(
        count +
          " Data has been fetched and saved to the ContactSourcesFact Table."
      );
      logToFile(
        `${count} Data has been fetched and saved to the ContactSourcesFact Table.`
      );
      count++;
      // }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Retrying ${retryCount}`);
    logToFile(`Retrying ${retryCount}`);
    retryCount--;
    if (retryCount === 0) {
      throw error; // If retries exhausted, throw the error
    }
    // Sleep for a while before retrying (optional)
    await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds
  } finally {
    // connection.end();
    count = 0;
  }
}

async function getEmailTrendFact(BearerToken, connection, queryName) {
  const accessToken = BearerToken;
  const apiUrl =
    "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/GetEmailTrendFact";
  let retryCount = 5;

  // Configure axios to automatically retry requests on certain HTTP errors
  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  try {
    while (retryCount > 0) {
      // while (true) {
      let data = [];

      const response = await axios.get(`${apiUrl}?pageSize=*`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;

      if (!responseData || !responseData.Response) {
        console.log(
          "GetEmailTrendFact API response does not contain valid data."
        );
        logToFile(
          `GetEmailTrendFact API response does not contain valid data.`
        );
        break; // Exit the loop if the response is not valid
      }

      data = data.concat(responseData.EmailTrendFacts);
      // console.log("data length :", data.length);

      if (data.length === 0) {
        console.log("No more data retrieved from the GetEmailTrendFact API.");
        logToFile(`No more data retrieved from the GetEmailTrendFact API.`);
        break; // Exit the loop when no more data is retrieved
      }

      // Assuming 'data' is an array of objects obtained from the API
      // Save data to MySQL database
      const insertQuery = queries[queryName];

      const values = data.map((item) => [
        item.EmailTrendFactID,
        item.CtcID,
        item.OpCode,
        item.PrjMkgTitle,
        item.Subject,
        item.CategoryID,
        item.Category,
        item.SendDate,
        item.OpenDate,
        item.TimeOfDayEmailOpened,
        item.DayOfWeekEmailOpened,
        item.SubmittedBy,
        item.SenderProfileID,
        item.SenderProfile,
        item.BrandName,
        item.DomainName,
        item.IsFollowUp,
        item.IsComplaint,
        item.Status,
        item.Error,
        item.FirstTrial,
        item.LastTrial,
        item.NbTrial,
        item.NbClicks,
        item.NbViews,
        item.Unsubscribe,
        item.CostPerItem,
        item.ModifiedDate,
      ]);

      connection.query(insertQuery, [values]);

      console.log(
        count + " Data has been fetched and saved to the EmailTrendFact Table."
      );
      logToFile(
        `${count} Data has been fetched and saved to the EmailTrendFact Table.`
      );
      count++;
      // }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Retrying ${retryCount}`);
    logToFile(`Retrying ${retryCount}`);
    retryCount--;
    if (retryCount === 0) {
      throw error; // If retries exhausted, throw the error
    }
    // Sleep for a while before retrying (optional)
    await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds
  } finally {
    // connection.end();
    count = 0;
  }
}

async function getLoyaltyPointsFact(BearerToken, connection, queryName) {
  const accessToken = BearerToken;
  const apiUrl =
    "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/GetLoyaltyPointsFact";
  let retryCount = 5;

  // Configure axios to automatically retry requests on certain HTTP errors
  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  try {
    while (retryCount > 0) {
      // while (true) {
      let data = [];

      const response = await axios.get(`${apiUrl}?pageSize=*`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;

      if (!responseData || !responseData.Response) {
        console.log(
          "GetLoyaltyPointsFact API response does not contain valid data."
        );
        logToFile(
          `GetLoyaltyPointsFact API response does not contain valid data.`
        );
        break; // Exit the loop if the response is not valid
      }

      data = data.concat(responseData.LoyaltyPointsFacts);
      // console.log("data length :", data.length);

      if (data.length === 0) {
        console.log(
          "No more data retrieved from the GetLoyaltyPointsFact API."
        );
        logToFile(`No more data retrieved from the GetLoyaltyPointsFact API.`);
        break; // Exit the loop when no more data is retrieved
      }

      // Assuming 'data' is an array of objects obtained from the API
      // Save data to MySQL database
      const insertQuery = queries[queryName];

      const values = data.map((item) => [
        item.LoyaltyPointsFactID,
        item.CtcID,
        item.OrderUniqueID,
        item.SiteID,
        item.SiteName,
        item.ActionDate,
        item.Points,
        item.Source,
        item.ModifiedDate,
      ]);

      connection.query(insertQuery, [values]);

      console.log(
        count +
          " Data has been fetched and saved to the LoyaltyPointsFact Table."
      );
      logToFile(
        `${count} Data has been fetched and saved to the LoyaltyPointsFact Table.`
      );
      count++;
      // }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Retrying ${retryCount}`);
    logToFile(`Retrying ${retryCount}`);
    retryCount--;
    if (retryCount === 0) {
      throw error; // If retries exhausted, throw the error
    }
    // Sleep for a while before retrying (optional)
    await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds
  } finally {
    // connection.end();
    count = 0;
  }
}

async function getVisitsFact(BearerToken, connection, queryName) {
  const accessToken = BearerToken;
  const apiUrl =
    "https://atreemo.updates.thedrg.co.uk/api/BIDWHouse/GetVisitsFact";
  let retryCount = 5;

  // Configure axios to automatically retry requests on certain HTTP errors
  axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

  try {
    while (retryCount > 0) {
      // while (true) {
      let data = [];

      const response = await axios.get(`${apiUrl}?pageSize=*`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;

      if (!responseData || !responseData.Response) {
        console.log("GetVisitsFact API response does not contain valid data.");
        logToFile(`GetVisitsFact API response does not contain valid data.`);
        break; // Exit the loop if the response is not valid
      }

      data = data.concat(responseData.VisitsFacts);

      if (data.length === 0) {
        console.log("No more data retrieved from the GetVisitsFact API.");
        logToFile(`No more data retrieved from the GetVisitsFact API.`);
        break; // Exit the loop when no more data is retrieved
      }

      // Assuming 'data' is an array of objects obtained from the API
      // Save data to MySQL database
      const insertQuery = queries[queryName];

      const values = data.map((item) => [
        item.VisitsFactID,
        item.CtcID,
        item.VisitDateTime,
        item.SiteID,
        item.SiteName,
        item.DirectSpent,
        item.IndirectSpent,
        item.Source,
        item.ModifiedDate,
      ]);

      connection.query(insertQuery, [values]);

      console.log(
        count + " Data has been fetched and saved to the VisitsFact Table."
      );
      logToFile(
        `${count} Data has been fetched and saved to the VisitsFact Table.`
      );
      count++;
      // }
    }
  } catch (error) {
    console.error("Error:", error);
    console.log(`Retrying ${retryCount}`);
    logToFile(`Retrying ${retryCount}`);
    retryCount--;
    if (retryCount === 0) {
      throw error; // If retries exhausted, throw the error
    }
    // Sleep for a while before retrying (optional)
    await new Promise((resolve) => setTimeout(resolve, 20000)); // 20 seconds
  } finally {
    // connection.end();
    count = 0;
  }
}

module.exports = {
  getBookingsFact,
  getContactDetailsFact,
  getTransactionsFact,
  getContactPreferencesFact,
  getContactSourcesFact,
  getEmailTrendFact,
  getLoyaltyPointsFact,
  getVisitsFact,
};
