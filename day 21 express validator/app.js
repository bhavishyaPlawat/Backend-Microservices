const express = require("express");
const { registerValidationRules } = require("./middleware/validate");
const app = express();
app.use(express.json());
app.post("/register", registerValidationRules, (req, res) => {
  const { username, email, phone, password } = req.body;
  res.status(200).json({
    message: "User registered successfully",
    user: { username, email, phone },
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
