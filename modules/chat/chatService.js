import { v4 as uuidv4 } from "uuid";
import openai from "../../config/openai.js";
import { customQnAService } from "../customQnA/index.js";

// In-memory session store
const sessions = {}; // { sessionId: [{ role, content }] }

const handleChat = async (req, res) => {
  let { sessionId, message, model } = req.body;

  // console.log("--- Chat Request ---");
  // console.log("Received sessionId:", sessionId);

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Generate a new session if sessionId not provided, or re-init if session was lost (e.g., server restart)
  if (!sessionId || !sessions[sessionId]) {
    sessionId = sessionId || uuidv4();
    sessions[sessionId] = [
      { role: "system", content: "You are a helpful AI assistant." },
    ];
    // console.log("Created NEW session:", sessionId);
  } else {
    // console.log("Using EXISTING session:", sessionId);
  }

  // Add user message to session history
  sessions[sessionId].push({ role: "user", content: message });
  // console.log("Session messages count:", sessions[sessionId].length);

  // SSE Headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Send sessionId to client so it can be reused
  res.write(`data: ${JSON.stringify({ sessionId })}\n\n`);

  // Check custom Q&A
  const matched = await customQnAService.findCustomResponse(message);
  if (matched) return customQnAService.streamResponse(res, matched.answer);

  const selectedModel = model || "stepfun/step-3.5-flash:free";

  let assistantText = "";

  try {
    const stream = await openai.chat.completions.create({
      model: selectedModel,
      messages: sessions[sessionId],
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) {
        assistantText += text;
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    // Add assistant response to session
    sessions[sessionId].push({ role: "assistant", content: assistantText });

    res.write(`data: ${JSON.stringify({ done: true, sessionId })}\n\n`);
    res.end();
  } catch (err) {
    console.error("OpenAI API error:", err);
    res.write(
      `data: ${JSON.stringify({ error: err.message || "Something went wrong" })}\n\n`,
    );
    res.end();
  }
};

export const chatService = { handleChat };
