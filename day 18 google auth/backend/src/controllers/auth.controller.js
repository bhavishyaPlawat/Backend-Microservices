const jwt = require("jsonwebtoken");

exports.googleCallback = (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // You can redirect to your frontend with the token in the URL or send JSON
  res.redirect(`http://localhost:5174/login-success?token=${token}`);
};
