const mongoose = require("mongoose");

// Connects to MongoDB database using mongoose
function connectToDB() {
  // Attempts to establish a connection with the provided MongoDB URL
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      // Logs success message to console
      console.log("connected to DB");
    })
    .catch((err) => {
      // Logs failure message with error details to console
      console.log("connection failed:", err);
    });
}

// Exports the connectToDB function for use in other modules
module.exports = connectToDB;
