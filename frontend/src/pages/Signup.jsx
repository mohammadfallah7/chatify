import { Navigate } from "react-router";
import { SignupForm } from "../components";
import { useAuthStore } from "../stores";

export const SignupPage = () => {
  const user = useAuthStore((s) => s.user);

  if (user) return <Navigate to="/" replace />;

  return <SignupForm />;
};
