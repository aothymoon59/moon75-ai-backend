import openai from "../../config/openai.js";
import { customQnAService } from "../customQnA/index.js";

const handleChat = async (req, res) => {
  const { message, model } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  // SSE Headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Check custom responses first
  const matched = customQnAService.findCustomResponse(message);
  if (matched) return customQnAService.streamResponse(res, matched.answer);

  // Call OpenRouter AI
  const selectedModel = model || "stepfun/step-3.5-flash:free";

  const stream = await openai.chat.completions.create({
    model: selectedModel,
    messages: [{ role: "user", content: message }],
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || "";
    if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
  }

  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
};

export const chatService = { handleChat };
