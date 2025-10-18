// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// attach token (supports both token keys to be safe)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('ap_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      const { status } = err.response;
      if (status === 401 || status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('ap_token');
        // fallback: redirect to login / GitHub OAuth
        const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        window.location.href = `${apiBase}/auth/github`;
      }
    } else {
      console.error('Network error', err.message);
    }
    return Promise.reject(err);
  }
);

export default API;
