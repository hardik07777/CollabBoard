import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/auth.store";

export const useSocket = (boardId?: string) => {
  const socketRef = useRef<Socket | null>(null);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io("http://localhost:5000", {
      auth: { token },
    });

    if (boardId) {
      socketRef.current.emit("join_board", boardId);
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [boardId, token]);

  return socketRef.current;
};
