import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT_NO || 4000;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.BASE_URL,
});

// AI Chat API Call
async function chatAPI(prompt) {
  const completion = await openai.chat.completions.create({
    model: process.env.MODEL,
    messages: [{ role: "user", content: `${prompt}` }],
    temperature: 0.8,//0.5
    top_p: 1,
    max_tokens: 2024,//1024
    stream: true,
  });

  let response = "";
  for await (const chunk of completion) {
    response += chunk.choices[0]?.delta?.content || "";
  }
  return response;
}

// AI Chat Endpoint
app.post("/aiChat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    // console.log("User message:", userMessage);

    const response = await chatAPI(userMessage);
    // console.log("AI response:", response);

    res.status(200).json({ response });
  } catch (error) {
    console.error("Error handling AI chat:", error);
    res.status(500).json({ error: "Something went wrong." });
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
