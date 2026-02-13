import {
  LucideLoader,
  LucideLockKeyhole,
  LucideMail,
  LucideMessageCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { axiosInstance } from "../../lib";
import { useAuthStore } from "../../stores";
import { BorderAnimatedContainer } from "../ui";

export const LoginForm = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/login", formData);
      if (res.status === 200) {
        toast.success(res.data.message);
        setUser(res.data.response);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BorderAnimatedContainer>
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center md:border-r border-slate-600/30">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <LucideMessageCircle className="size-12 mx-auto text-slate-400 mb-3" />
              <h2 className="text-2xl font-bold text-slate-200 mb-1.5">
                Welcome Back
              </h2>
              <p className="text-slate-400">Login to access your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div>
              <label htmlFor="email" className="auth-input-label">
                Email
              </label>
              <div className="relative">
                <LucideMail className="auth-input-icon" />
                <input
                  type="email"
                  id="email"
                  className="auth-input"
                  placeholder="johndoe@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="auth-input-label">
                Password
              </label>
              <div className="relative">
                <LucideLockKeyhole className="auth-input-icon" />
                <input
                  type="password"
                  id="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading && <LucideLoader className="size-4 animate-spin" />}
              Login
            </button>

            <div className="text-center">
              <Link to="/signup" className="auth-link">
                Don't have an account? Signup
              </Link>
            </div>
          </form>
        </div>

        <div className="md:w-1/2 hidden md:flex p-8 items-center justify-center bg-linear-to-b from-slate-800/20 to-transparent">
          <div>
            <img src="/login.png" alt="Signup image" className="w-sm" />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-medium text-cyan-400">
                Connect Anytime, Anywhere
              </h3>
              <div className="mt-4 flex justify-center gap-4">
                <span className="auth-badge">Secure</span>
                <span className="auth-badge">Fast</span>
                <span className="auth-badge">Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BorderAnimatedContainer>
  );
};
