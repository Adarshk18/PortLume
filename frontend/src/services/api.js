// src/services/api.js
import axios from 'axios'

const API_BASE = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Axios instance (used for actions like publish, sync, analytics)
const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token before every request (tries both keys)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ap_token') || localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      const { status } = error.response
      if (status === 401 || status === 403) {
        console.warn('Session expired. Logging out...')
        localStorage.removeItem('ap_token')
        localStorage.removeItem('token')
        const apiBase = API_BASE
        window.location.href = `${apiBase}/auth/github`
      }
    }
    return Promise.reject(error)
  }
)

// lightweight fetch wrapper to get portfolio data (returns parsed JSON body)
export const getPortfolioData = async () => {
  const token = localStorage.getItem('ap_token') || localStorage.getItem('token')
  if (!token) throw new Error('No token found')

  const res = await fetch(`${API_BASE}/api/portfolio/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to load portfolio')
  return data.data
}

export default API
