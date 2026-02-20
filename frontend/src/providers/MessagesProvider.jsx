import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MessagesContext } from "../contexts";
import { axiosInstance } from "../lib";

export const MessagesProvider = ({ children, targetUserId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

    return () => {
      isActive = false;
    };
  }, [targetUserId]);

  return (
    <MessagesContext.Provider value={{ data, loading, setData }}>
      {children}
    </MessagesContext.Provider>
  );
};
