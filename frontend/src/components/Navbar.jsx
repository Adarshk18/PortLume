import React from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const loggedIn = Boolean(localStorage.getItem('ap_token'))

  const logout = () => {
    localStorage.removeItem('ap_token')
    window.location.href = '/'
  }

  return (
    <motion.nav
      className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-b-2xl shadow-md sticky top-0 z-50"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo / Title */}
      <div
        onClick={() => (window.location.href = '/')}
        className="text-xl font-bold cursor-pointer hover:text-indigo-300 transition-colors"
      >
        ⚡ AutoPortfolio AI
      </div>

      {/* Nav Buttons */}
      <div className="flex gap-3">
        {loggedIn ? (
          <>
            <a
              href="/edit"
              className="bg-indigo-500 px-3 py-2 rounded-md hover:bg-indigo-600 transition-all duration-200"
            >
              Dashboard
            </a>

            <a
              href="/analytics"
              className="bg-purple-500 px-3 py-2 rounded-md hover:bg-purple-600 transition-all duration-200"
            >
              Analytics
            </a>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href={`${
              import.meta.env.VITE_API_URL || 'http://localhost:5000'
            }/auth/github`}
            className="bg-green-500 px-3 py-2 rounded-md hover:bg-green-600 transition-all duration-200"
          >
            Sign in with GitHub
          </a>
        )}
      </div>
    </motion.nav>
  )
}
