import axios from 'axios';

// Create a centralized Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (error handling)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific status codes, like unauthorized/expired token
    if (error.response && error.response.status === 401) {
      // e.g., trigger a logout or token refresh process
      console.warn('Unauthorized! Token may be invalid or expired.');
      // Optional: localStorage.removeItem('token');
      // Optional: window.location.href = '/login';
    }
    
    // You can also add generic error toast notification logic here
    console.error('API Error:', error.response?.data?.message || error.message);
    
    return Promise.reject(error);
  }
);

export default api;
