import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, default: "sent" },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);
