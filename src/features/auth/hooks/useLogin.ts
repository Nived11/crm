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
      const response = await api.post('/auth/login/', { email, password });
      if (response.status === 200) {
        login(response.data.user); 
        toast.success(`Successfully logged in!`);
        navigate('/admin', { replace: true });
      }
    } catch (error: any) {
      setAuthError(error.response?.data?.error || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    setLoading(true);
    try {
      const idToken = credentialResponse.credential;

      const response = await api.post('/auth/google/', { 
        token: idToken 
      });

      if (response.status === 200) {
        login(response.data.user); 
        toast.success("Successfully logged in!");
        navigate('/admin', { replace: true });
      }
    } catch (error: any) {
      console.error("Backend Error:", error.response?.data);
      setAuthError(error.response?.data?.error || "Google verification failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    email, setEmail, password, setPassword,
    loading, authError, handleEmailLogin,
    handleGoogleLoginSuccess
  };
}