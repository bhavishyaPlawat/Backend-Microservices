const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.set("view engine", "ejs");

app.post("/api/auth/signup", (req, res) => {
  res.send("signup api");
});

app.get("/", (req, res) => {
  res.render("home");
});

module.exports = app;
