import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { GoogleGenAI, Type } from "@google/genai";
import { config } from "dotenv";
import { required } from "zod/mini";

config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
const tools = [];

// Define the function declaration for the model
const weatherFunctionDeclaration = {
  name: "get_current_temperature",
  description: "Gets the current temperature for a given location.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: {
        type: Type.STRING,
        description: "The city name, e.g. San Francisco",
      },
    },
    required: ["location"],
  },
};

// Send request with function declarations
// const response = await ai.models.generateContent({
//   model: "gemini-3-flash-preview",
//   contents: "What's the temperature in London?",
//   config: {
//     tools: [
//       {
//         functionDeclarations: [weatherFunctionDeclaration],
//       },
//     ],
//   },
// });

const transport = new StdioClientTransport({
  command: "node",
  args: ["./mcp.server.js"],
});

const client = new Client({ name: "my-client", version: "1.0.0" });

await client.connect(transport);

client.listTools().then(async (resp) => {
  resp.tools.forEach((tool) => {
    tools.push({
      name: tool.name,
      description: tool.description,
      parameters: {
        type: "OBJECT",
        properties: tool.inputSchema.properties,
        required: tool.inputSchema.required || [],
      },
    });
  });

  const aiResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "i am bhavishya, call the greet tool to greet me",
    config: {
      tools: [
        {
          functionDeclarations: tools,
        },
      ],
    },
  });
  console.log("AI response", aiResponse.functionCalls);
  aiResponse.functionCalls.forEach(async (call) => {
    const result = await client.callTool({
      name: call.name,
      arguments: call.args,
    });
    console.log("output", result);
  });
});
