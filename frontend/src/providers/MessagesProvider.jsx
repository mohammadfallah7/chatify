import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MessagesContext } from "../contexts";
import { axiosInstance } from "../lib";
import { useChatStore, useSocketStore } from "../stores";

const notificationSound = new Audio("/sounds/notification.mp3");

export const MessagesProvider = ({ children, targetUserId }) => {
  const isMute = useChatStore((s) => s.isMute);
  const socket = useSocketStore((s) => s.socket);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleNewMessage = useCallback(
    (savedMessage) => {
      const isMessageSendFromTargetUser =
        savedMessage.senderId === targetUserId;
      if (!isMessageSendFromTargetUser) return;

      setData((prevData) => [...prevData, savedMessage]);

      if (!isMute) {
        notificationSound.currentTime = 0;
        notificationSound
          .play()
          .catch((err) => console.error("Audio play failed", err));
      }
    },
    [isMute, targetUserId],
  );

  useEffect(() => {
    let isActive = true;
    const fetchMessages = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get(`/api/messages/${targetUserId}`);
        if (isActive) setData(res.data.response);
      } catch (error) {
        if (isActive)
          toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchMessages();

    if (socket) socket.on("savedMessage", handleNewMessage);

    return () => {
      isActive = false;
      if (socket) socket.off("savedMessage", handleNewMessage);
    };
  }, [targetUserId, socket, handleNewMessage]);

  return (
    <MessagesContext.Provider value={{ data, loading, setData }}>
      {children}
    </MessagesContext.Provider>
  );
};
