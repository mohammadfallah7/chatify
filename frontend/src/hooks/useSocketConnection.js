// hooks/useSocketConnection.js
import { useEffect, useRef } from "react";
import { useAuthStore, useSocketStore } from "../stores";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3001" : "/";

export const useSocketConnection = () => {
  const user = useAuthStore((s) => s.user);
  const { socket, setSocket, setOnlineUserIds, removeSocket } =
    useSocketStore();
  const lastUserIdRef = useRef(null);

  useEffect(() => {
    const userId = user?._id;
    if (!userId) {
      if (socket) {
        socket.disconnect();
        removeSocket();
      }
      lastUserIdRef.current = null;
      return;
    }

    if (socket && lastUserIdRef.current && lastUserIdRef.current !== userId) {
      socket.disconnect();
      removeSocket();
    }

    if (!socket) {
      const newSocket = io(BASE_URL, {
        withCredentials: true,
        autoConnect: true,
      });

      newSocket.on("getOnlineUsers", (ids) => {
        setOnlineUserIds(ids);
      });

      setSocket(newSocket);
      lastUserIdRef.current = userId;
    }

    return () => {
      if (socket?.connected) {
        socket.disconnect();
        removeSocket();
      }
    };
  }, [user, socket, setOnlineUserIds, setSocket, removeSocket]);
};
