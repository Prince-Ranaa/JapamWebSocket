import { Router, Request, Response } from "express";
import { ChatService } from "./chat.service";
import { onlineUsers } from "../../utils/onlineUsers";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { io } from "../../server";

const router = Router();
const chatService = new ChatService();

router.post("/send", authMiddleware, async (req: any, res: Response) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: "receiverId and content are required",
      });
    }

    const savedMsg = await chatService.sendMessage(
      senderId,
      receiverId,
      content
    );

    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message:receive", savedMsg);
    }

    return res.json({ success: true, message: savedMsg });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get(
  "/history/:receiverId",
  authMiddleware,
  async (req: any, res: Response) => {
    try {
      const senderId = req.user.id;
      const receiverId = req.params.receiverId;

      const history = await chatService.getChatHistory(senderId, receiverId);

      return res.json({ success: true, history });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
);

export default router;
