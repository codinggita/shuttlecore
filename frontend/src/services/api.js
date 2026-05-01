import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────
// Resolve API base URL:
//  - Local dev:  reads VITE_API_BASE_URL from frontend/.env  → http://localhost:5000/api
//  - Production: reads VITE_API_BASE_URL from Netlify env vars → https://shuttle-core.onrender.com/api
//  - Hard fallback (should never be reached in practice)
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://shuttle-core.onrender.com/api';  // <─ production safety net

if (import.meta.env.DEV) {
  console.log('[API] Base URL:', BASE_URL);
}
// ─────────────────────────────────────────────────────────────────────

// Centralized Axios instance used throughout the app
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // send cookies / auth headers cross-origin
});

// Request Interceptor ─ attach JWT from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor ─ centralised error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('[API] 401 Unauthorized — clearing session and redirecting to login.');
      localStorage.removeItem('token');
      localStorage.removeItem('userProfile');
      // Only redirect if not already on an auth page
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    console.error('[API] Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
