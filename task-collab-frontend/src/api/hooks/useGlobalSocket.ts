// useGlobalSocket.ts
import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/auth.store";

export const useGlobalSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (!token) return;

    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000", {
        auth: { token },
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  return socketRef.current;
};