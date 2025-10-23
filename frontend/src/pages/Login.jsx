// src/pages/Login.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleGitHubLogin = () => {
    // Redirect to backend GitHub OAuth
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <rect x="7" y="9" width="10" height="8" rx="1" fill="#3B82F6"/>
              <circle cx="10" cy="12" r="1" fill="white"/>
              <circle cx="14" cy="12" r="1" fill="white"/>
              <path d="M9 15h6" stroke="white" strokeWidth="1" strokeLinecap="round"/>
              <rect x="6" y="7" width="2" height="2" rx="0.5" fill="#3B82F6"/>
              <rect x="16" y="7" width="2" height="2" rx="0.5" fill="#3B82F6"/>
              <rect x="11" y="5" width="2" height="2" rx="0.5" fill="#3B82F6"/>
            </svg>
          </div>
        </div>

        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Welcome to PortLume AI
        </h1>
        <p className="mb-10 text-slate-300 text-lg max-w-md mx-auto">
          Connect your GitHub account to automatically build and update your AI-enhanced portfolio in seconds.
        </p>

        <button
          onClick={handleGitHubLogin}
          className="group relative px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>

        <p className="mt-8 text-slate-500 text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;