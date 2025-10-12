import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ["Features", "Pricing", "Examples", "Dashboard"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        {/* 🌟 Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-cyan-400 text-2xl font-bold tracking-tight">
            Autoportfolio
          </span>
          <span className="text-white/90 text-2xl font-bold tracking-tight">
            AI
          </span>
        </div>

        {/* 🧭 Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {item}
            </button>
          ))}
          <button className="ml-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-5 py-2 rounded-md shadow-lg font-semibold transition-all duration-300">
            Sign In
          </button>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-cyan-300 hover:text-cyan-100 transition-all"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-[#0b1120]/95 backdrop-blur-lg border-t border-white/10 py-5 px-8 space-y-4 text-sm">
          {navItems.map((item) => (
            <button
              key={item}
              className="text-left text-gray-300 hover:text-white transition-all duration-200"
            >
              {item}
            </button>
          ))}
          <button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-4 py-2 rounded-md shadow-md text-center">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}
