// src/services/api.js
import axios from "axios";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

// Create Axios instance
const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ============================================================
// 🔐 AUTH TOKEN HANDLING
// ============================================================
const getToken = () =>
  localStorage.getItem("ap_token") || localStorage.getItem("token");

const setToken = (token) => {
  if (token) {
    localStorage.setItem("ap_token", token);
  }
};

const clearToken = () => {
  localStorage.removeItem("ap_token");
  localStorage.removeItem("token");
};

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// 🔄 AUTO TOKEN REFRESH INTERCEPTOR
// ============================================================

// Track whether a refresh request is in progress
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // If unauthorized, attempt token refresh once
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue the request until refresh is done
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(API(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${API_BASE}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data?.token;
        if (newToken) {
          setToken(newToken);
          API.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          onTokenRefreshed(newToken);
        }

        isRefreshing = false;
        return API(originalRequest);
      } catch (refreshErr) {
        console.warn("Token refresh failed:", refreshErr.message);
        isRefreshing = false;
        clearToken();

        const redirectURL = `${API_BASE}/auth/github`;
        if (window.location.href !== redirectURL) {
          window.location.href = redirectURL;
        }

        return Promise.reject(refreshErr);
      }
    }

    // Handle other errors
    if (status === 403) {
      console.warn("Forbidden: insufficient permissions.");
    } else if (!error.response) {
      console.error("Network/server error:", error.message);
    }

    return Promise.reject(error);
  }
);

// ============================================================
// 📊 LIGHTWEIGHT FETCH FOR PORTFOLIO DASHBOARD
// ============================================================
export const getPortfolioData = async () => {
  const token = getToken();
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`${API_BASE}/api/portfolio/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result?.message || "Failed to load portfolio data.");

  return result?.data;
};

// ============================================================
// 🔧 EXPORTS
// ============================================================
export { API_BASE, getToken, setToken, clearToken };
export default API;
