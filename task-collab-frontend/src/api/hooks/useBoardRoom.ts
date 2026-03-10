// useBoardRoom.ts
import { useEffect } from "react";
import { Socket } from "socket.io-client";

export const useBoardRoom = (
  socket: Socket | null,
  boardId?: string
) => {
  useEffect(() => {
    if (!socket || !boardId) return;

    const handleConnect = () => {
      socket.emit("join_board", boardId);
    };

    if (socket.connected) {
      socket.emit("join_board", boardId);
    } else {
      socket.on("connect", handleConnect);
    }

    return () => {
      socket.emit("leave_board", boardId);
      socket.off("connect", handleConnect);
    };
  }, [socket, boardId]);
};