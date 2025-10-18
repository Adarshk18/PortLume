import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../LandingPage.css'; // This now safely affects only .landing-page

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGitHubAuth = () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    window.location.href = `${backend}/auth/github`;
  };

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div
          className="navbar-logo cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className="logo-icon">🤖</span> PortLume AI
        </div>

        {/* Desktop Links */}
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><a onClick={() => scrollToSection('#features')}>Features</a></li>
          <li><a onClick={() => scrollToSection('#about')}>About Us</a></li>
          <li><a onClick={() => scrollToSection('#contact')}>Contact</a></li>
        </ul>

        {/* Navbar Actions */}
        <div className="navbar-actions">
          <button onClick={handleGitHubAuth} className="btn btn-login">
            Login
          </button>
          <button onClick={handleGitHubAuth} className="btn btn-primary">
            Get Started Free
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" aria-label="Hero Section">
        <div className="ai-background"></div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>Revolutionize Your Portfolio. Effortlessly.</h1>
            <p>
              Harness the power of AI to create, manage, and optimize your professional
              portfolio in minutes, not hours.
            </p>

            <div className="hero-actions">
              <button
                onClick={handleGitHubAuth}
                className="btn btn-primary btn-cta-primary"
              >
                Start Building Your Portfolio
              </button>
              <button
                onClick={() => scrollToSection('#features')}
                className="btn btn-cta-secondary"
              >
                See How It Works
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-placeholder">
              <p>AI Portfolio Visual Placeholder</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
