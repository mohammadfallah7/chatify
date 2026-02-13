import { useNavigate } from "react-router";
import { useAuthStore } from "../stores";

export const LoginPage = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  return (
    <div className="z-10">
      LoginPage
      <button
        onClick={() => {
          setUser({ name: "Mohammad" });
          navigate("/");
        }}
      >
        Login
      </button>
    </div>
  );
};
