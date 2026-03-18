import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Global Middleware
app.use(cors());
app.use(express.json());

// =======================
// 🔹 Load Modules
// =======================
import chatModule from "./modules/chat/index.js";
app.use("/api/chat", chatModule.routes);

// Health Check
app.get("/", (req, res) => res.send("🚀 Moon75 AI Agent API running..."));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 AI Agent backend running at http://localhost:${PORT}`);
});
