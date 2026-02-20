import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "./stores";
import { useSocketConnection } from "./hooks/useSocketConnection";

const ProtectRoute = () => {
  const user = useAuthStore((s) => s.user);
  useSocketConnection();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectRoute;
