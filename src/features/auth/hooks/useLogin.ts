import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

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
    
    console.log("Simulating API Call for:", email);
    
    setTimeout(() => {
      // Dummy user and token to satisfy Zustand
      login("dummy-token-xyz", { email });
      setLoading(false);
      navigate('/admin', { replace: true });
    }, 2000);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    authError,
    handleEmailLogin
  };
}
