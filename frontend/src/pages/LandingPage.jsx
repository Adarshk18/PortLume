// src/pages/LandingPage.jsx
import React from "react";
import { Bot, Zap } from "lucide-react";

// Use your environment variable, with a fallback warning
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "YOUR_VITE_BACKEND_URL_HERE";

const LandingPage = () => {
  // Redirect to backend GitHub OAuth route
  const handleGitHubLogin = () => {
    if (BACKEND_URL && BACKEND_URL !== "YOUR_VITE_BACKEND_URL_HERE") {
      window.location.href = `${BACKEND_URL}/auth/github`;
    } else {
      console.warn(
        "Backend URL not configured. Please set VITE_BACKEND_URL in your .env file."
      );
      alert(
        "Backend URL not configured. Please set VITE_BACKEND_URL in your .env file."
      );
    }
  };

  // --- Visual mockup of AI interface ---
  const AIMockupVisual = () => (
    <div className="relative w-full max-w-lg aspect-[1.3/1] rotate-[-5deg] transform transition-all duration-500 hover:rotate-0">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-slate-700/50">
        <div className="absolute inset-2 bg-slate-800/20 rounded-xl border border-blue-400/30 overflow-hidden">
          {/* Graph-like dot pattern */}
          <svg
            className="w-full h-full opacity-50 absolute top-0 left-0"
            viewBox="0 0 100 100"
          >
            {[...Array(10)].map((_, i) =>
              [...Array(10)].map((_, j) => (
                <circle
                  key={`${i}-${j}`}
                  cx={10 + i * 9}
                  cy={10 + j * 9}
                  r={j % 3 === 0 ? 0.8 : 0.4}
                  className="fill-blue-300"
                />
              ))
            )}
            <path
              d="M10 10 L50 90 M90 10 L50 90 M50 50 L20 80 M70 30 L50 50"
              className="stroke-blue-400/50 stroke-[0.3]"
            />
          </svg>

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-mono text-xl tracking-wider">
            <span className="flex items-center space-x-2 bg-slate-900/40 p-2 rounded-full px-4">
              <Zap className="w-5 h-5 text-sky-400" />
              <span>AI Portfolio Interface</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Navbar ---
  const NavBar = () => (
    <header className="absolute top-0 left-0 w-full z-10 py-4 px-6 md:px-12">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2 text-xl font-bold text-slate-800">
          <Bot className="w-6 h-6 text-sky-500" />
          <span>PortLume AI</span>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8 text-slate-600 font-medium">
          {["Dashboard", "Features", "About Us", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-blue-600 transition duration-150"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleGitHubLogin}
            className="hidden lg:block text-slate-700 hover:text-blue-600 font-medium transition"
          >
            Login
          </button>
          <button
            onClick={handleGitHubLogin}
            className="px-5 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg shadow-blue-500/50 hover:from-sky-600 hover:to-blue-700 transition transform hover:scale-[1.02] active:scale-95"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </header>
  );

  // --- Page Layout ---
  return (
  <div className="min-h-screen font-sans antialiased relative overflow-hidden bg-gradient-to-r from-blue-50 via-sky-100 to-amber-50">
    {/* Navbar */}
    <NavBar />

    {/* Hero Section */}
    <main className="pt-28 md:pt-36 pb-16 md:pb-24 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Content */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
          Revolutionize <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
            Your Portfolio.
          </span>
          <br />
          Effortlessly.
        </h1>
        <p className="text-lg text-slate-700 max-w-xl mx-auto md:mx-0">
          Harness the power of AI to create, manage, and optimize your
          professional portfolio in minutes, not hours.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
          <button
            onClick={handleGitHubLogin}
            className="flex items-center justify-center px-8 py-3 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg hover:shadow-sky-500/40 transition transform hover:-translate-y-0.5"
          >
            Start Building Your Portfolio
          </button>
          <button
            onClick={handleGitHubLogin}
            className="flex items-center justify-center px-8 py-3 text-lg font-semibold text-blue-600 rounded-xl border-2 border-blue-500 bg-white hover:bg-blue-50 transition"
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* Right Visual */}
      <div className="flex-1 flex justify-center md:justify-end">
        <AIMockupVisual />
      </div>
    </main>

    {/* Gradient glows */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute top-10 left-20 w-[30rem] h-[30rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-[25rem] h-[25rem] bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
    </div>
  </div>
);

};

export default LandingPage;
