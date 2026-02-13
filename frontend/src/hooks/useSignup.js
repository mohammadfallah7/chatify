import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib";
import { useAuthStore } from "../stores";

export const useSignup = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const mutate = async (formData) => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/signup", formData);
      if (res.status === 201) {
        toast.success(res.data.message);
        setUser(res.data.response);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
};
