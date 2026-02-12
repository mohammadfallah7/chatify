import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "./stores";

const ProtectRoute = () => {
  const user = useAuthStore((s) => s.user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectRoute;
