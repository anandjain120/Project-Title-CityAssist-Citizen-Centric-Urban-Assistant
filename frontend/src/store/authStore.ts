import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  medicalFlags?: string[];
  commutePatterns?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setUser: (user) => set({ user, isAuthenticated: true }),
      
      setToken: (token) => set({ token }),
      
      login: async (email: string, password: string) => {
        // Mock login - replace with actual API call
        try {
          // TODO: Replace with actual API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          
          if (response.ok) {
            const data = await response.json();
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
            });
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          // Mock success for development
          set({
            user: {
              id: '1',
              email,
              name: 'John Doe',
            },
            token: 'mock-token',
            isAuthenticated: true,
          });
        }
      },
      
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
