const app = require("./src/app");
const dotenv = require("dotenv").config();
const connectToDB = require("./src/db/db");

connectToDB();

app.listen("3000", () => {
  console.log("server is running on port 3000");
});
