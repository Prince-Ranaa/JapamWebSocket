import { MessageModel, IMessage } from "./chat.model";

export class ChatRepository {
  async saveMessage(data: Partial<IMessage>) {
    const message = new MessageModel(data);
    return await message.save();
  }

  async getChatHistory(user1: string, user2: string) {
    return await MessageModel.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ createdAt: 1 });
  }
}
