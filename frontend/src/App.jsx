import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProfileEditor from './pages/ProfileEditor';
import PublicProfile from './pages/PublicProfile';
import Analytics from './pages/Analytics';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login'; // 👈 Added Login page
import AuthSuccess from "./pages/AuthSuccess";
import './App.css';

// ✅ Scroll restoration on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ✅ Animated route transitions
const PageTransition = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`min-h-screen ${
        isDashboard
          ? "bg-gray-100 text-gray-900" // ✅ Light mode for dashboard
          : "bg-gradient-to-b from-[#1b1b33] to-[#2c2c54] text-gray-100" // ✅ Dark mode for landing
      }`}
    >
      {children}
    </motion.div>
  );
};


function AnimatedRoutes() {
  const location = useLocation();

  // Hide navbar on public profile or auth pages
  const hideNavbar =
    location.pathname.startsWith('/public/') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/auth');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PageTransition>
                <LandingPage />
              </PageTransition>
            }
          />
          <Route
            path="/auth/success"
            element={
              <PageTransition>
                <AuthSuccess />
              </PageTransition>
            }
          />

          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />
          {/* OAuth redirect from backend */}
          <Route
            path="/auth/success"
            element={
              <PageTransition>
                <Login /> {/* Reuses Login to capture ?token and redirect */}
              </PageTransition>
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

          {/* Protected Routes */}
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
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <ProfileEditor />
                </PageTransition>
              </ProtectedRoute>
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

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
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
