import { create } from 'zustand';

interface AuthState {
  user: { name: string; email: string } | null;
  isAuthenticated: boolean;
  login: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user_profile') || 'null'),
  isAuthenticated: !!localStorage.getItem('user_profile'),

  login: (user) => {
    localStorage.setItem('user_profile', JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('user_profile');
    set({ user: null, isAuthenticated: false });
  },
}));