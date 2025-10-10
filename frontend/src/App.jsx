import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Dashboard from './pages/Dashboard'
import ProfileEditor from './pages/ProfileEditor'
import PublicProfile from './pages/PublicProfile'
import Analytics from './pages/Analytics'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-800 to-purple-700 text-white flex flex-col">
      <Navbar />

      <main className="flex-grow p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location} key={location.pathname}>
              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit"
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

              {/* Public routes */}
              <Route path="/p/:publicUrl" element={<PublicProfile />} />
              <Route path="/auth/success" element={<AuthSuccess />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="text-center py-4 text-sm text-gray-300">
        © {new Date().getFullYear()} AutoPortfolio AI • Crafted with ⚡ + ❤️
      </footer>
    </div>
  )
}

// Handles OAuth redirect success from backend
function AuthSuccess() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('ap_token', token)
      window.location.href = '/'
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-[70vh] text-xl animate-pulse">
      Authenticating...
    </div>
  )
}
