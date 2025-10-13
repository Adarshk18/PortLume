// src/pages/Login.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle redirect from backend with token
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }
  }, [location, navigate]);

  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Login to PortLume AI</h1>
      <p className="mb-8 text-slate-300 text-center max-w-md">
        Connect your GitHub account to automatically build and update your AI-enhanced portfolio.
      </p>
      <button
        onClick={handleGitHubLogin}
        className="px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg font-semibold text-lg hover:scale-105 transition"
      >
        Continue with GitHub
      </button>
    </div>
  );
};

export default Login;
