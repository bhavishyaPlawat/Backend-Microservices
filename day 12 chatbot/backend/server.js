const dotenv = require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Getresponse = require("./src/service/Ai.service");

const chatHistory = [];

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("user connected succesfull");

  socket.on("AI-Response", async (prompt) => {
    console.log("prompt: ", prompt);
    chatHistory.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const response = await Getresponse(chatHistory);
    chatHistory.push({
      role: "model",
      parts: [{ text: response }],
    });
    console.log(response);
    socket.emit("AI-reply", response);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
