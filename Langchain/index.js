import { config } from "dotenv";
import { ChatGoogle } from "@langchain/google";
import { response } from "express";
config();
const model = new ChatGoogle({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

model
  .invoke([
    [
      "human",
      "What would be a good company name for a company that makes colorful socks?",
    ],
  ])
  .then((response) => {
    console.log(response.content);
  });
