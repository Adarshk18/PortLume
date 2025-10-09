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
      className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md rounded-b-2xl shadow-md"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-xl font-bold">⚡ AutoPortfolio AI</div>
      <div className="flex gap-3">
        {loggedIn ? (
          <>
            <a href="/edit" className="bg-indigo-500 px-3 py-2 rounded-md">
              Dashboard
            </a>
            <button onClick={logout} className="bg-red-500 px-3 py-2 rounded-md">
              Logout
            </button>
          </>
        ) : (
          <a
            href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/github`}
            className="bg-green-500 px-3 py-2 rounded-md"
          >
            Sign in with GitHub
          </a>
        )}
      </div>
    </motion.nav>
  )
}
