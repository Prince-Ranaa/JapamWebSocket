import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

import { createServer } from "http";
import { Server } from "socket.io";

import { socketAuthMiddleware } from "./middlewares/socketAuth.middleware";
import { onlineUsers } from "./utils/onlineUsers";
import { chatSocketHandler } from "./modules/chat/chat.socket";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["token"],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

io.on("connection", (socket) => {
  const userId = socket.data.userId;

  onlineUsers.set(userId, socket.id);

  socket.on("user:check-status", (id, callback) => {
    const isOnline = onlineUsers.has(id);
    callback({ online: isOnline });
  });

  io.emit("user:online", userId);

  chatSocketHandler(io, socket);

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);

    socket.broadcast.emit("user:offline", userId);
  });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("📦 MongoDB Connected");

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("❌ MongoDB Error:", err.message));
