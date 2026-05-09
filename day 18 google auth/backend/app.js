require("dotenv").config();
const express = require("express");
const passport = require("passport");
const connectDB = require("./src/db/db");
// const passport = require("./src/config/passport");
const authRoutes = require("./src/routes/authRoutes");
const authGuard = require("./src/middleware/auth");
const app = express();

// Connect Database
connectDB();

// Passport Config
require("./src/config/passport")(passport);
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);

// Example Protected Route

app.get("/api/dashboard", authGuard, (req, res) => {
  res.send(`Welcome User ID: ${req.user.id}`);
});

app.listen(3000, () => console.log("Server running on port 3000"));
