import { chatService } from "./chatService.js";

const chatController = async (req, res, next) => {
  try {
    await chatService.handleChat(req, res);
  } catch (err) {
    next(err);
  }
};

export { chatController };
