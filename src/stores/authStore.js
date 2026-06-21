import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as api from '../api/auth';

const STORAGE_KEY = 'auth';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,

      initializeAuth: async () => {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (!stored) return;

          const parsed = JSON.parse(stored);
          const token = parsed?.state?.token;

          if (token) {
            const data = await api.getCurrent(token);
            set({
              user: data?.user || data || null,
              token,
            });
          }
        } catch (error) {
          console.error('Auth initialization failed:', error);
          set({ user: null, token: null });
          localStorage.removeItem(STORAGE_KEY);
        }
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const data = await api.login({ email, password });
          const token = data?.token || data?.accessToken || null;
          set({
            token,
            user: data?.user || null,
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (payload) => {
        set({ isLoading: true });
        try {
          const data = await api.register(payload);
          const token = data?.token || data?.accessToken || null;
          set({
            token,
            user: data?.user || null,
            isLoading: false,
          });
          return data;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem(STORAGE_KEY);
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
