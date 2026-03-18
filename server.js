const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const { customResponses } = require("./constants/custom-response");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/* =========================
   🔹 OpenRouter Config
========================= */
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NODE_OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "AI Agent Chat",
  },
});

/* =========================
   🔹 Helper Function
========================= */
const findCustomResponse = (message) => {
  const userMessage = message.toLowerCase().trim();

  return customResponses.find((item) =>
    item.keywords.some((keyword) => userMessage.includes(keyword)),
  );
};

/* =========================
   🔹 Streaming Helper
========================= */
const streamResponse = async (res, text) => {
  for (const char of text) {
    res.write(`data: ${JSON.stringify({ text: char })}\n\n`);
    await new Promise((resolve) => setTimeout(resolve, 15)); // typing effect
  }

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
};

app.get("/", (req, res) => {
  res.send("🚀 Moon75 AI Agent API running...");
});

/* =========================
   🔹 Chat API
========================= */
app.post("/api/chat", async (req, res) => {
  const { message, model } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    /* =========================
       🔹 Check Custom Q&A
    ========================= */
    const matched = findCustomResponse(message);

    if (matched) {
      return await streamResponse(res, matched.answer);
    }

    /* =========================
       🔹 OpenRouter AI Call
    ========================= */
    const selectedModel = model || "stepfun/step-3.5-flash:free";

    console.log("Selected Model:", selectedModel);

    const stream = await openai.chat.completions.create({
      model: selectedModel,
      messages: [{ role: "user", content: message }],
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";

      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error("OpenAI API error:", err);

    res.write(
      `data: ${JSON.stringify({ error: err.message || "Something went wrong" })}\n\n`,
    );
    res.end();
  }
});

/* =========================
   🔹 Server Start
========================= */
app.listen(PORT, () => {
  console.log(`🚀 AI Agent backend running at http://localhost:${PORT}`);
});
