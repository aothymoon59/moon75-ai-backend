import * as customQnAService from "./customQnAService.js";

// GET /api/admin/qna — List all
export const getAllQnA = async (req, res, next) => {
  try {
    const data = await customQnAService.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/qna — Create new
export const createQnA = async (req, res, next) => {
  try {
    const { keywords, answer } = req.body;
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return res.status(400).json({ error: "Keywords array is required" });
    }
    if (!answer || !answer.trim()) {
      return res.status(400).json({ error: "Answer is required" });
    }
    const item = await customQnAService.create({ keywords, answer });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/qna/:id — Update
export const updateQnA = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { keywords, answer } = req.body;
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return res.status(400).json({ error: "Keywords array is required" });
    }
    if (!answer || !answer.trim()) {
      return res.status(400).json({ error: "Answer is required" });
    }
    const updated = await customQnAService.update(id, { keywords, answer });
    if (!updated) return res.status(404).json({ error: "Q&A not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/qna/:id — Delete
export const deleteQnA = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await customQnAService.remove(id);
    if (!removed) return res.status(404).json({ error: "Q&A not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
