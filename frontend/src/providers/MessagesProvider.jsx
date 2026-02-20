import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MessagesContext } from "../contexts";
import { axiosInstance } from "../lib";

export const MessagesProvider = ({ children, targetUserId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get(`/api/messages/${targetUserId}`);
        setData(res.data.response);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [targetUserId]);

  return (
    <MessagesContext.Provider value={{ data, loading, setData }}>
      {children}
    </MessagesContext.Provider>
  );
};
