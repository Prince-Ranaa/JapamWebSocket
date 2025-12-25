import { ChatService } from "./chat.service";
import { onlineUsers } from "../../utils/onlineUsers";

export function chatSocketHandler(io: any, socket: any) {
  const chatService = new ChatService();

  socket.on("message:send", async ({ receiverId, content }: any) => {
    const senderId = socket.data.userId;

    const savedMsg = await chatService.sendMessage(
      senderId,
      receiverId,
      content
    );

    const receiverSocketId = onlineUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message:receive", savedMsg);
    }
  });

  socket.on("message:history", async ({ userId }: any) => {
    const history = await chatService.getChatHistory(
      socket.data.userId,
      userId
    );
    socket.emit("message:history:response", history);
  });
}
