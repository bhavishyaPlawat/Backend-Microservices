const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function Getresponse(chatHistory) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: chatHistory,
    config: {
      systemInstruction:
        "You are the Most smartest Person alive , tell in most simple words , use less words to explain and try to answer in bulletins and paragraphs which suits best  so that it is easy to read for the reader , give answer very precise to the point and format your responses as markdown so that react markdown can show that effectively",
    },
  });

  return response.text;
}

module.exports = Getresponse;
