const sendmail = require("./email");

sendmail.sendEmail(
  "tobhavishya2004@gmail.com",
  "Test Subject",
  "Test text content",
  "<p>testing email</p>",
);
