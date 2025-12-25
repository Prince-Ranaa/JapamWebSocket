import { ChatRepository } from "./chat.repository";

export class ChatService {
  private chatRepo = new ChatRepository();

  async sendMessage(senderId: string, receiverId: string, content: string) {
    return this.chatRepo.saveMessage({
      senderId,
      receiverId,
      content,
      status: "sent",
      timestamp: new Date(),
    });
  }

  async getChatHistory(user1: string, user2: string) {
    return this.chatRepo.getChatHistory(user1, user2);
  }
}
