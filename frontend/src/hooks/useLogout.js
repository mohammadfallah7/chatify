import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib";
import { useAuthStore } from "../stores";

export const useLogout = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const mutate = async () => {
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/logout");
      toast.success(res.data.message);
      setUser(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
};
