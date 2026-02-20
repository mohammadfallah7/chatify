import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib";

export const useChatPartners = () => {
  const [loading, setLoading] = useState(false);
  const [chatPartners, setChatPartners] = useState([]);

  useEffect(() => {
    const fetchChatPartners = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get("/api/messages/chats");
        setChatPartners(res.data.response);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchChatPartners();
  }, []);

  return { data: chatPartners, loading };
};
