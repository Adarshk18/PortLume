import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProfileEditor from './pages/ProfileEditor'
import PublicProfile from './pages/PublicProfile'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-800 to-purple-700 text-white">
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit" element={<ProfileEditor />} />
          <Route path="/p/:publicUrl" element={<PublicProfile />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
        </Routes>
      </main>
    </div>
  )
}

// small component for OAuth redirect handler
function AuthSuccess() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      localStorage.setItem('ap_token', token)
      window.location.href = '/'
    }
  }, [])
  return <div className="text-center mt-20 text-xl">Authenticating...</div>
}
