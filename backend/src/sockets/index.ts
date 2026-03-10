import { Server } from "socket.io";
import { registerBoardSocket } from "./board.socket";
import { verifySocketToken } from "../utils/socketAuth";

let io: Server;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // 🔐 JWT authentication middleware
  io.use(verifySocketToken);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    registerBoardSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};