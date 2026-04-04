import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import api from '@/api/axios'; 
import { toast } from 'sonner';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    try {
      // RULE: Backend set cookies directly via withCredentials: true
      const response = await api.post('/auth/login/', { email, password });
      
      if (response.status === 200) {
        // Save user profile only, no tokens in localStorage
        login(response.data.user); 
        toast.success(`Welcome back, Admin!`);
        navigate('/admin', { replace: true });
      }
    } catch (error: any) {
      console.error("Login Error:", error.response?.data);
      setAuthError(error.response?.data?.error || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email, setEmail, password, setPassword,
    loading, authError, handleEmailLogin
  };
}