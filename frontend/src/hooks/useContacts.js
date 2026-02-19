import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib";

export const useContacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get("/api/messages/contacts");
        setContacts(res.data.response);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return { data: contacts, loading };
};
