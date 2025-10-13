import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProfileEditor from './pages/ProfileEditor';
import PublicProfile from './pages/PublicProfile';
import Analytics from './pages/Analytics';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import './App.css';

// Scroll restoration on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Animation wrapper for route transitions
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className="min-h-screen bg-gradient-to-b from-[#1b1b33] to-[#2c2c54] text-gray-100"
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  // Define which routes should hide the Navbar (e.g., public profiles)
  const hideNavbar = location.pathname.startsWith('/public/');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <LandingPage />
              </PageTransition>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <ProfileEditor />
                </PageTransition>
              </ProtectedRoute>
            }
          />
          <Route
            path="/public/:username"
            element={
              <PageTransition>
                <PublicProfile />
              </PageTransition>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Analytics />
                </PageTransition>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
