import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib";
import { useAuthStore } from "../stores";

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const mutate = async (formData) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/login", formData);
      if (res.status === 200) {
        toast.success(res.data.message);
        setUser(res.data.response);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
};
