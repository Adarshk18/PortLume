import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('ap_token')

  if (!token) {
    // Redirect to GitHub login if not logged in
    return <Navigate to="/login" replace />;
  }

  // Render the protected page
  return children
}
