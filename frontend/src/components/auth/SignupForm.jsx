import {
  LucideLoader,
  LucideLockKeyhole,
  LucideMail,
  LucideMessageCircle,
  LucideUser,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useSignup } from "../../hooks";
import { BorderAnimatedContainer } from "../ui";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { mutate, loading } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <BorderAnimatedContainer>
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center md:border-r border-slate-600/30">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <LucideMessageCircle className="size-12 mx-auto text-slate-400 mb-3" />
              <h2 className="text-2xl font-bold text-slate-200 mb-1.5">
                Create Account
              </h2>
              <p className="text-slate-400">Sign up for a new account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            <div>
              <label htmlFor="fullName" className="auth-input-label">
                Full Name
              </label>
              <div className="relative">
                <LucideUser className="auth-input-icon" />
                <input
                  type="text"
                  id="fullName"
                  className="auth-input"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

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
              Create Account
            </button>

            <div className="text-center">
              <Link to="/login" className="auth-link">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>

        <div className="md:w-1/2 hidden md:flex p-8 items-center justify-center bg-linear-to-b from-slate-800/20 to-transparent">
          <div>
            <img src="/signup.png" alt="Signup image" className="w-sm" />
            <div className="mt-6 text-center">
              <h3 className="text-xl font-medium text-cyan-400">
                Start Your Journey Today
              </h3>
              <div className="mt-4 flex justify-center gap-4">
                <span className="auth-badge">Free</span>
                <span className="auth-badge">Easy Setup</span>
                <span className="auth-badge">Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BorderAnimatedContainer>
  );
};
