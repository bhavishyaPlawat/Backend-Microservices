const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function signupController(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({ username });

  if (existingUser) {
    return res.status(409).json({
      message: "Username already exist",
    });
  }
  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
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

  res.status(201).json({ message: "User created successfully", user });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const usernameValid = await userModel.findOne({
    username,
  });

  if (!usernameValid) {
    return res.status(404).json({
      message: "Username not found",
    });
  }

  const passwordValid = await bcrypt.compare(password, usernameValid.password);

  if (!passwordValid) {
    return res.status(409).json({
      message: "Inavlid Password",
    });
  }

  const token = jwt.sign(
    {
      id: usernameValid._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in succesfull",
  });
}

async function userController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorised Token not received",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });
    return res.status(200).json({
      message: "User info fetched succesfull",
      user,
    });
  } catch (err) {
    console.log("Some issue occured", err);
  }
}

async function logoutController(req, res) {
  res.clearCookie("token");

  res.status(200).json({
    message: "logout sccuesfull",
  });
}

module.exports = {
  signupController,
  loginController,
  userController,
  logoutController,
};
