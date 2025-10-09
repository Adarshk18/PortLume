import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import ProfileEditor from './pages/ProfileEditor'
import PublicProfile from './pages/PublicProfile'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit" element={<ProfileEditor />} />
          <Route path="/p/:publicUrl" element={<PublicProfile />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}

function AuthSuccess() {
  React.useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (token) localStorage.setItem('ap_token', token)
    window.location.href = '/'
  }, [])
  return <div className="text-center mt-10">Authenticating...</div>
}
