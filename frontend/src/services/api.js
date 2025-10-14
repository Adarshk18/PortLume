import axios from 'axios'

// Create API instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true, // allows cookies if needed for OAuth
  headers: {
    'Content-Type': 'application/json'
  }
})

// src/services/api.js
export const getPortfolioData = async (token) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/portfolio/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to load portfolio');
  return data.data;
};


// Attach JWT token before every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ap_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Global response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response

      // Handle unauthorized / expired token
      if (status === 401 || status === 403) {
        console.warn('Session expired. Logging out...')
        localStorage.removeItem('ap_token')
        // Redirect to GitHub login
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        window.location.href = `${apiBase}/auth/github`
      }

      // Optional: show toast or alert for server errors
      if (status >= 500) {
        console.error('Server error:', error.response.data)
      }
    } else {
      console.error('Network error or CORS issue:', error.message)
    }

    return Promise.reject(error)
  }
)

export default API
