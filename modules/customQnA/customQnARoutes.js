import express from "express";
import { getAllQnA, createQnA, updateQnA, deleteQnA } from "./customQnAController.js";

const router = express.Router();

router.get("/", getAllQnA);
router.post("/", createQnA);
router.put("/:id", updateQnA);
router.delete("/:id", deleteQnA);

export default router;
