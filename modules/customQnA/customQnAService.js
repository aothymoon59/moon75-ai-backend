import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_PATH = join(__dirname, "../../data/customResponses.json");

// ─── Helpers ──
const readData = async () => {
  const raw = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw);
};

const writeData = async (data) => {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// ─── Chat-facing ──
const findCustomResponse = async (message) => {
  const responses = await readData();
  const userMessage = message.toLowerCase().trim();
  return responses.find((item) =>
    item.keywords.some((keyword) => userMessage.includes(keyword))
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

// ─── CRUD ──
const getAll = async () => {
  return await readData();
};

const getById = async (id) => {
  const data = await readData();
  return data.find((item) => item.id === id);
};

const create = async ({ keywords, answer }) => {
  const data = await readData();
  const newItem = { id: generateId(), keywords, answer };
  data.push(newItem);
  await writeData(data);
  return newItem;
};

const update = async (id, { keywords, answer }) => {
  const data = await readData();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], keywords, answer };
  await writeData(data);
  return data[index];
};

const remove = async (id) => {
  const data = await readData();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return false;
  data.splice(index, 1);
  await writeData(data);
  return true;
};

export { findCustomResponse, streamResponse, getAll, getById, create, update, remove };
