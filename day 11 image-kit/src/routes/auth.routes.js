const express = require("express");

const {
  loginController,
  signupController,
  userController,
  logoutController,
} = require("../controller/auth.controller");

const router = express.Router();

router.post("/signup", signupController);
router.get("/user", userController);
router.post("/login", loginController);
router.get("/logout", logoutController);

module.exports = router;
