// hooks/useSocketConnection.js
import { useEffect } from "react";
import { useAuthStore, useSocketStore } from "../stores";
import { io } from "socket.io-client";

export const useSocketConnection = () => {
  const user = useAuthStore((s) => s.user);
  const { socket, setSocket, setOnlineUserIds, removeSocket } =
    useSocketStore();

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        removeSocket();
      }
      return;
    }

    if (!socket) {
      const newSocket = io("http://localhost:3001", {
        withCredentials: true,
        autoConnect: true,
      });

      newSocket.on("getOnlineUsers", (ids) => {
        setOnlineUserIds(ids);
      });

      setSocket(newSocket);
    }

    return () => {
      if (socket?.connected) {
        socket.disconnect();
        removeSocket();
      }
    };
  }, [user, socket, setOnlineUserIds, setSocket, removeSocket]);
};
