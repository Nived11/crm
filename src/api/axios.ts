import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Access the VITE_ prefixed env variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach bearer token
api.interceptors.request.use(
  (config) => {
    // In a real scenario we might read this directly from localStorage or from Zustand.
    // Zustand's getState allows reading state outside of React components.
    const token = useAuthStore.getState().token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Logic to handle 401 Unauthorized via Zustand
      useAuthStore.getState().logout();
      
      // Optionally redirect to login, but usually React Router handles the route change
      // if state reflects logged out.
    }
    return Promise.reject(error);
  }
);

export default api;
