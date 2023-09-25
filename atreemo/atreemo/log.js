const fs = require("fs");

// Define the log file path
const logFilePath = "logs/logFile.log";
function getTimestamp() {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return now.toLocaleString("en-US", options);
}

// Function to log messages to the file
function logToFile(message) {
  const timestamp = getTimestamp();
  const logMessage = `${timestamp}: ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
}

logToFile("Script finished");

module.exports = {
  logToFile,
};
