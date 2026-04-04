import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'https://viceversa.pythonanywhere.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // RULE: Mandatory for Cookie-based Auth
  withCredentials: true, 
});

/**
 * 🔄 Response Interceptor: Silent Refresh Logic
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // RULE: Handle 401 Unauthorized (Expired Access Token)
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Prevent infinite loops if the login or refresh call itself fails with 401
      if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
         return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // RULE: POST /auth/refresh/ with empty body and credentials
        await axios.post(`${API_URL}/auth/refresh/`, {}, { withCredentials: true });
        
        // Retry the original request (cookies will now be updated)
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, the session is dead. Clear local state and redirect.
        useAuthStore.getState().logout();
        window.location.replace('/login');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;