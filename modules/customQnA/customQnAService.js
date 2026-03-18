import { customResponses } from "../../constants/customResponses.js";

const findCustomResponse = (message) => {
  const userMessage = message.toLowerCase().trim();
  return customResponses.find((item) =>
    item.keywords.some((keyword) => userMessage.includes(keyword)),
  );
};

const streamResponse = async (res, text, delay = 15) => {
  for (const char of text) {
    res.write(`data: ${JSON.stringify({ text: char })}\n\n`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  res.end();
};

export { findCustomResponse, streamResponse };
