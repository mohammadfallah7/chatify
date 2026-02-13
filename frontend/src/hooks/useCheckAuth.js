import { useEffect } from "react";
import { axiosInstance } from "../lib";
import { useAuthStore } from "../stores";

export const useCheckAuth = () => {
  const { setUser, setIsChecking } = useAuthStore();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/check");
        setUser(res.data.response);
      } catch (error) {
        setUser(null);
        console.error(error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuthentication();
  }, [setUser, setIsChecking]);
};
