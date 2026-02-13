import { Navigate } from "react-router";
import { useAuthStore } from "../stores";

export const SignupPage = () => {
  const user = useAuthStore((s) => s.user);

  if (user) return <Navigate to="/" replace />;

  return <div>Signup</div>;
};
