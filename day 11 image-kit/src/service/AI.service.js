const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function GenerateCaption(base64ImageFile) {
  const contents = [
    {
      parts: [
        {
          inlineData: {
            mimeType: "image/png",
            data: base64ImageFile,
          },
        },
        {
          text: "give 1 caption",
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Official docs show this model
      contents: contents,
      config: {
        systemInstruction:
          "You are a creative writer and write engaging small and hooky caption for the image , use emoji and hashtags also",
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating caption:", error);
    throw new Error("Failed to generate caption: " + error.message);
  }
}

module.exports = GenerateCaption;
