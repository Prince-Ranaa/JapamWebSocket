import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export function socketAuthMiddleware(socket: Socket, next: any) {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.token ||
      socket.handshake.query?.token;

    if (!token) {
      return next(new Error("AUTH_TOKEN_MISSING"));
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    socket.data.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error("AUTH_TOKEN_INVALID"));
  }
}
