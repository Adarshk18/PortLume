import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle redirect from backend /auth/success?token=<jwt>
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [location, navigate]);

  const handleGitHubLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/github`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to PortLume AI</h1>
        <p className="mb-8 text-slate-300">
          Sign in with GitHub to build and manage your AI-powered portfolio.
        </p>
        <button
          onClick={handleGitHubLogin}
          className="w-full py-3 bg-gradient-to-r from-sky-400 to-blue-500 hover:scale-105 transition rounded-lg font-semibold"
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
