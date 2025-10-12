import React, { useState } from 'react';
import { Menu, X, Search, Terminal, Aperture, Briefcase } from 'lucide-react'; // Using Lucide icons for aesthetics

// --- Navbar Component ---
const Navbar = ({ isMenuOpen, toggleMenu }) => {
  // Navigation links
  const navItems = [
    { name: 'Features', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Examples', href: '#' },
    { name: 'Blog', href: '#' },
  ];

  return (
    <nav className="p-4 md:p-6 lg:px-20 z-10 relative border-b border-gray-800/50"> {/* Added subtle border */}
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo and Branding (Always Visible) */}
        <div className="flex items-center space-x-2">
          {/* Using Terminal icon as a stylized logo, matching the inspiration's aesthetic */}
          <Terminal className="w-6 h-6 text-[#00f5c9] transform rotate-90" />
          <span className="text-white text-xl font-bold tracking-tight">Autoportfolio AI</span>
        </div>

        {/* Desktop Navigation Links (VISIBLE ONLY on lg screens and up) */}
        {/* 'hidden' hides it by default (mobile), 'lg:flex' shows it on large screens. */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-300 hover:text-white transition duration-200">
              {item.name}
            </a>
          ))}
          {/* Sign In Button */}
          <button className="px-5 py-2 bg-[#00f5c9] text-[#10151f] font-semibold rounded-lg shadow-xl hover:bg-[#00e0b3] transition duration-200 ml-4">
            Sign In
          </button>
        </div>

        {/* Mobile Menu Icon (VISIBLE ONLY on screens smaller than lg) */}
        {/* 'lg:hidden' hides the menu button on large screens. */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none p-2 rounded-lg hover:bg-gray-800 transition">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Only visible when open and screen is small) */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 bg-[#10151f] rounded-lg shadow-2xl p-4 space-y-3 border border-gray-800">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-gray-300 hover:text-white transition duration-200 py-2 border-b border-gray-800"
              onClick={toggleMenu}
            >
              {item.name}
            </a>
          ))}
          <button className="w-full mt-3 px-5 py-2 bg-[#00f5c9] text-[#10151f] font-semibold rounded-lg shadow-xl hover:bg-[#00e0b3] transition duration-200">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

// --- Mockup Card (Right side visual) ---
const MockupCard = () => (
  <div className="relative w-full max-w-md lg:max-w-xl xl:max-w-2xl mt-12 lg:mt-0 p-4 lg:p-8">
    {/* Dark Gradient Overlay for background depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#10151f] to-transparent opacity-80 z-0"></div>

    {/* Mockup Container (White card) */}
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] transform translate-y-0 lg:translate-x-12 z-10 relative">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 p-2 rounded-xl border border-gray-200">
        <Search className="w-5 h-5 text-gray-500 ml-2" />
        <input
          type="text"
          placeholder="Build a portfolio for a Senior UX Designer"
          className="w-full bg-transparent text-sm placeholder-gray-500 focus:outline-none p-2"
          disabled
        />
        <button className="p-2 bg-white rounded-lg shadow hover:bg-gray-200 transition">
          <Search className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* Inner Content Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Card 1 */}
        <div className="col-span-1 border border-gray-200 p-4 rounded-xl space-y-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <p className="text-xs font-semibold text-gray-800">Case Studies</p>
          <div className="flex space-x-1">
            <div className="h-1 w-5 bg-gray-300 rounded"></div>
            <div className="h-1 w-3 bg-gray-300 rounded"></div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="col-span-1 border border-gray-200 p-4 rounded-xl space-y-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <p className="text-xs font-semibold text-gray-800">Content</p>
          <div className="flex space-x-1">
            <div className="h-1 w-5 bg-gray-300 rounded"></div>
            <div className="h-1 w-3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
       {/* Small profile card example */}
       <div className="mt-4 border border-gray-200 p-4 rounded-xl flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        <p className="text-xs font-semibold text-gray-800">About Section</p>
        <Aperture className='w-4 h-4 text-[#00f5c9]'/>
       </div>

    </div>
  </div>
);


// --- Main App Component ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-[#10151f] text-white font-inter">
      {/* Global Gradient Background Effect - for visual flair */}
      {/* This creates the glow effect seen in the background of the target image */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 30%, #00f5c9 0%, transparent 40%)' }}></div>

      <div className="relative">
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <main className="max-w-7xl mx-auto px-4 lg:px-20 pt-16 pb-20 grid lg:grid-cols-2 items-center min-h-[calc(100vh-80px)]">
          {/* Left Column (Hero Section) */}
          <div className="lg:pr-12">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tighter mb-6">
              STOP DESIGNING. <br />
              <span className="text-[#00f5c9] drop-shadow-lg">START SHOW.ASING</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-10">
              The AI-Powered Platform that builds, curates, and optimizes your professional portfolio in **minutes, not weeks.**
            </p>

            {/* Primary Action Button */}
            <button className="px-8 py-4 text-lg bg-[#00f5c9] text-[#10151f] font-bold rounded-xl shadow-2xl shadow-[#00f5c9]/30 hover:bg-[#00e0b3] transition duration-300 transform hover:scale-[1.02] flex items-center">
              Generate Your Portfolio Now <span className="ml-3 text-2xl font-light">&rarr;</span>
            </button>

            {/* Trusted By */}
            <div className="mt-16 flex items-center space-x-4 text-sm text-gray-400">
              <span className="font-semibold">Used by creatives at</span>
              <div className="flex items-center space-x-1">
                {/* Placeholder for Microsoft Logo/Icon */}
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-white">Microsoft</span>
              </div>
            </div>
          </div>

          {/* Right Column (Mockup Card) */}
          <div className="flex justify-center lg:justify-end">
            <MockupCard />
          </div>
        </main>
      </div>
    </div>
  );
}
