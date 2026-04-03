import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'https://viceversa.pythonanywhere.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; 

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        
        originalRequest._retry = true; 

        try {
          await axios.post(`${API_URL}/auth/refresh/`, {}, { withCredentials: true });

          return api(originalRequest);

        } catch (refreshError) {
          useAuthStore.getState().logout();
          toast.error("Session expired. Please login again.");
          window.location.replace('/login');
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;