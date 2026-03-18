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
import { customQnARoutes } from "./modules/customQnA/index.js";
import { adminAuth } from "./middlewares/adminAuth.js";
app.use("/api/chat", chatModule.routes);
app.post("/api/admin/verify", (req, res) => {
  const { secretCode } = req.body;
  if (secretCode === process.env.ADMIN_SECRET_CODE) {
    return res.json({ success: true });
  }
  return res.status(401).json({ error: "Invalid secret code" });
});
app.use("/api/admin/qna", adminAuth, customQnARoutes);

// Health Check
app.get("/", (req, res) => res.send("🚀 Moon75 AI Agent API running..."));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 AI Agent backend running at http://localhost:${PORT}`);
});
