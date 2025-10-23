import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-orange-100 overflow-hidden">
      {/* ---------- Header ---------- */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          {/* Robot Icon */}
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="7" y="9" width="10" height="8" rx="1" fill="#3B82F6"/>
              <circle cx="10" cy="12" r="1" fill="white"/>
              <circle cx="14" cy="12" r="1" fill="white"/>
              <path d="M9 15h6" stroke="white" strokeWidth="1" strokeLinecap="round"/>
              <rect x="6" y="7" width="2" height="2" rx="0.5" fill="#3B82F6"/>
              <rect x="16" y="7" width="2" height="2" rx="0.5" fill="#3B82F6"/>
              <rect x="11" y="5" width="2" height="2" rx="0.5" fill="#3B82F6"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">PortLume AI</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium text-sm">
          <button onClick={() => navigate('/dashboard')} className="hover:text-gray-900 transition">
            Dashboard
          </button>
          <a href="#features" className="hover:text-gray-900 transition">Features</a>
          <a href="#about" className="hover:text-gray-900 transition">About Us</a>
          <a href="#contact" className="hover:text-gray-900 transition">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button 
                onClick={handleLogin}
                className="hidden md:block text-gray-700 font-medium text-sm hover:text-gray-900 transition"
              >
                Login
              </button>
              <button 
                onClick={handleGetStarted}
                className="bg-sky-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-sky-600 transition shadow-md"
              >
                Get Started Free
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/dashboard')}
                className="hidden md:block text-gray-700 font-medium text-sm hover:text-gray-900 transition"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-12 md:px-16 lg:px-24 xl:px-32 gap-16 max-w-7xl mx-auto">
        {/* Text */}
        <div className="max-w-xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-none tracking-tight">
            Revolutionize<br />
            Your Portfolio.<br />
            Effortlessly.
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed">
            Harness the power of AI to create, manage, and optimize your<br className="hidden md:block" />
            professional portfolio in minutes, not hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleGetStarted}
              className="bg-sky-400 text-white px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-sky-500 transition shadow-lg"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Start Building Your Portfolio'}
            </button>
            <button className="bg-white text-gray-700 px-8 py-3.5 rounded-lg font-semibold text-base hover:bg-gray-50 transition shadow-md border border-gray-200">
              See How It Works
            </button>
          </div>
        </div>

        {/* Laptop Mockup */}
        <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
          <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* Screen */}
            <div className="w-80 md:w-96 lg:w-[32rem] h-56 md:h-64 lg:h-80 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-2xl overflow-hidden border-8 border-slate-800 relative">
              {/* Screen content */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-slate-500/40 to-slate-600/60">
                {/* Browser frame */}
                <div className="absolute top-4 left-4 right-4 bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  
                  {/* AI Portfolio Interface text */}
                  <p className="text-white/70 font-medium text-sm text-center mb-6">
                    AI Portfolio Interface
                  </p>

                  {/* Node network */}
                  <div className="relative h-32 flex items-center justify-center">
                    {/* Center node */}
                    <div className="absolute w-3 h-3 bg-white rounded-full shadow-lg animate-pulse z-10"></div>

                    {/* Surrounding nodes - arranged in a circle */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                      const radius = 50;
                      const x = Math.cos((angle * Math.PI) / 180) * radius;
                      const y = Math.sin((angle * Math.PI) / 180) * radius;
                      return (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-blue-200/60 rounded-full"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: 'translate(-50%, -50%)',
                            animation: `pulse 2s infinite ${i * 0.2}s`
                          }}
                        ></div>
                      );
                    })}

                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                        const radius = 50;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;
                        return (
                          <line
                            key={i}
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${x}px)`}
                            y2={`calc(50% + ${y}px)`}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1"
                          />
                        );
                      })}
                    </svg>

                    {/* Additional scattered nodes */}
                    <div className="absolute top-2 left-8 w-1.5 h-1.5 bg-blue-300/40 rounded-full"></div>
                    <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-blue-300/40 rounded-full"></div>
                    <div className="absolute bottom-4 left-16 w-1.5 h-1.5 bg-blue-300/40 rounded-full"></div>
                    <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-blue-300/40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop bottom */}
            <div className="w-96 md:w-[28rem] lg:w-[36rem] h-3 bg-slate-800 rounded-b-xl mx-auto shadow-xl"></div>

            {/* Floating glow effects */}
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-sky-300/20 rounded-full blur-2xl"></div>

            {/* Sparkle icon */}
            <div className="absolute bottom-8 right-0 text-white opacity-80">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" opacity="0.8"/>
                <path d="M19 3L19.5 5.5L22 6L19.5 6.5L19 9L18.5 6.5L16 6L18.5 5.5L19 3Z" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;