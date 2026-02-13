import { Navigate } from "react-router";
import { LoginForm } from "../components";
import { useAuthStore } from "../stores";

export const LoginPage = () => {
  const user = useAuthStore((s) => s.user);

  if (user) return <Navigate to="/" replace />;

  return <LoginForm />;
};
