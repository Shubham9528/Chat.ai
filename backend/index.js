import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import bodyParser from "body-parser";

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT_NO || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// OpenAI Configuration
if (!process.env.OPENAI_API_KEY || !process.env.MODEL || !process.env.BASE_URL) {
  console.error("Missing required environment variables. Check your .env file.");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL, // Ensure this is set to OpenAI's API endpoint
});

// Function to communicate with OpenAI API
async function chatAPI(prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL, // Ensure this matches your OpenAI model (e.g., "gpt-4", "gpt-3.5-turbo")
      messages: [{ role: "user", content: `${prompt}` }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 4000, // Adjust max_tokens based on your needs and model limitations
      stream: true, // Set to false if you don't need streaming
    });

    let response = "";
    for await (const chunk of completion) {
      response += chunk.choices[0]?.delta?.content || "";
    }
    return response;
  } catch (error) {
    console.error("Error in chatAPI:", error.message);
    throw new Error("Failed to fetch AI response.");
  }
}

// AI Chat Endpoint
app.post("/aiChat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await chatAPI(userMessage);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error handling AI chat:", {
      message: error.message,
      stack: error.stack,
      details: error.response?.data,
    });
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("<h1>Backend server is running!!!</h1>");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});































// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import OpenAI from "openai";
// import bodyParser from "body-parser";

// dotenv.config();

// const app = express();
// const port = process.env.BACKEND_PORT_NO || 4000;

// app.use(bodyParser.json());
// app.use(cors());

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   baseURL: process.env.BASE_URL,
// });

// // AI Chat API Call
// async function chatAPI(prompt) {
//   const completion = await openai.chat.completions.create({
//     model: process.env.MODEL,
//     messages: [{ role: "user", content: `${prompt}` }],
//     temperature: 0.8,//0.5
//     top_p: 1,
//     max_tokens: 2024,//1024
//     stream: true,
//   });

//   let response = "";
//   for await (const chunk of completion) {
//     response += chunk.choices[0]?.delta?.content || "";
//   }
//   return response;
// }

// // AI Chat Endpoint
// app.post("/aiChat", async (req, res) => {
//   try {
//     const userMessage = req.body.message;
//     // console.log("User message:", userMessage);

//     const response = await chatAPI(userMessage);
//     // console.log("AI response:", response);

//     res.status(200).json({ response });
//   } catch (error) {
//     console.error("Error handling AI chat:", error);
//     res.status(500).json({ error: "Something went wrong." });
//   }
// });

// // Health Check Endpoint
// app.get("/", (req, res) => {
//   res.send("<h1>Backend server is running!!!</h1>");
// });

// // Start Server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });






















