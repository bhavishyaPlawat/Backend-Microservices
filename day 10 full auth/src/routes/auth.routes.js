const express = require("express");
// Initialize Express.js app

const userModel = require("../models/user.model");
// Import user model for database interactions

const jwt = require("jsonwebtoken");

const router = express.Router();
// Create a new router instance

router.post("/signup", async (req, res) => {
  // Handle signup request
  const { username, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    username,
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "username already in use",
    });
  }

  const user = await userModel.create({
    username: username,
    password: password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user signed up succesfully ",
    user,
  });
});

/**
 * GET /user endpoint to fetch user data
 */
router.get("/user", async (req, res) => {
  // Fetch user data from cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "unautharised token not received",
    });
  }

  try {
    // Verify token and fetch user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    return res.status(200).json({
      message: "user data fetched succesfully ",
    });
  } catch (err) {
    // Return error if token is invalid
    res.status(401).json({
      message: "unauthorised Inavlid token",
    });
  }
});

/**
 * POST /login endpoint to login user
 */
router.post("/login", async (req, res) => {
  // Handle login request
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: "user account not found",
    });
  }
  const isPasswordValid = user.password === password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "inavlid password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    message: "User logged in succesfull",
    user,
  });
});

/**
 * GET /logout endpoint to logout user
 */
router.get("/logout", async (req, res) => {
  // Clear token from cookie
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
});
module.exports = router;
