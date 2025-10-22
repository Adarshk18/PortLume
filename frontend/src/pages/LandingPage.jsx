import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-amber-50 to-orange-100 overflow-hidden">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12 md:py-6">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">PortLume AI</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-gray-900">Dashboard</a>
          <a href="#" className="hover:text-gray-900">Features</a>
          <a href="#" className="hover:text-gray-900">About Us</a>
          <a href="#" className="hover:text-gray-900">Contact</a>
        </nav>

        <div className="flex items-center space-x-3">
          <a href="/login" className="hidden md:block text-gray-700 font-medium hover:text-gray-900">Login</a>
          <button className="bg-sky-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-sky-600 transition">
            Get Started Free
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 py-16 md:px-12 lg:px-20 xl:px-32 gap-12">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
            Revolutionize<br />
            <span className="text-gray-800">Your Portfolio.</span><br />
            <span className="text-gray-700">Effortlessly.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
            Harness the power of AI to create, manage, and optimize your<br className="hidden md:block" />
            professional portfolio in minutes, not hours.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-sky-500 text-white px-7 py-3.5 rounded-lg font-semibold text-lg hover:bg-sky-600 transition shadow-md">
              Start Building Your Portfolio
            </button>
            <button className="border border-gray-300 text-gray-700 px-7 py-3.5 rounded-lg font-semibold text-lg hover:bg-gray-50 transition">
              See How It Works
            </button>
          </div>
        </div>

        {/* Tilted Screen */}
        <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
          <div className="relative transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-80 md:w-96 lg:w-[28rem] h-56 md:h-64 lg:h-72 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-600">
              <div className="absolute inset-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>

              <div className="relative h-full p-6 flex flex-col items-center justify-center text-center">
                <p className="text-white/80 font-medium text-sm md:text-base tracking-wider z-10">
                  AI Portfolio Interface
                </p>

                {/* Network Graph - PURE TAILWIND */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-48 h-48 md:w-56 md:h-56">
                    {/* Center Node */}
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>

                    {/* 12 Surrounding Nodes */}
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-8 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md"></div>
                    <div className="absolute bottom-8 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md"></div>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md transform -translate-x-1/2"></div>
                    <div className="absolute bottom-8 left-4 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md"></div>
                    <div className="absolute top-8 left-4 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md"></div>
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md transform -translate-y-1/2"></div>
                    <div className="absolute top-4 right-12 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md"></div>
                    <div className="absolute bottom-4 right-12 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md"></div>
                    <div className="absolute top-4 left-12 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md"></div>
                    <div className="absolute bottom-4 left-12 w-2 h-2 bg-blue-300 rounded-full opacity-70 shadow-md"></div>

                    {/* Lines */}
                    <svg className="absolute inset-0 w-full h-full" pointerEvents="none">
                      <line x1="50%" y1="50%" x2="50%" y2="0" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" className="animate-pulse" />
                      <line x1="50%" y1="50%" x2="85%" y2="25%" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <line x1="50%" y1="50%" x2="85%" y2="75%" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                      <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                      <line x1="50%" y1="50%" x2="15%" y2="75%" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
                      <line x1="50%" y1="50%" x2="15%" y2="25%" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
                      <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
                      <line x1="50%" y1="50%" x2="0" y2="50%" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-300/30 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-sky-300/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;