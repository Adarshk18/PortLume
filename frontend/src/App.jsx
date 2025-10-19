// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import pages
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import AuthSuccess from "./pages/AuthSuccess.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfileEditor from "./pages/ProfileEditor.jsx";
import Analytics from "./pages/Analytics.jsx";
import PublicProfile from "./pages/PublicProfile.jsx";

// Components
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-amber-50">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/auth-success" element={<AuthSuccess />} />

          {/* Protected pages (require token) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile-editor"
            element={
              <ProtectedRoute>
                <ProfileEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />

          {/* Public profile (no auth required) */}
          <Route path="/u/:username" element={<PublicProfile />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
