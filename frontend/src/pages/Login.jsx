import { Navigate } from "react-router";
import { useAuthStore } from "../stores";

export const LoginPage = () => {
  const user = useAuthStore((s) => s.user);

  if (user) return <Navigate to="/" replace />;

  return <div>LoginPage</div>;
};
