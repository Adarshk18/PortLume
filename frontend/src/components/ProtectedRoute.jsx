import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('ap_token')

  if (!token) {
    // Redirect to GitHub login if not logged in
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    window.location.href = `${apiBase}/auth/github`
    return null
  }

  // Render the protected page
  return children
}
