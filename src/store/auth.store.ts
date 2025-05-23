import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { authService, type User } from '../services/auth.service';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  immer((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,

    setUser: (user) =>
      set((state) => {
        state.user = user;
        state.isAuthenticated = !!user;
      }),

    fetchProfile: async () => {
      try {
        set((state) => {
          state.isLoading = true;
        });
        const user = await authService.getProfile();
        set((state) => {
          state.user = user;
          state.isAuthenticated = true;
        });
      } catch (error) {
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
        });
      } finally {
        set((state) => {
          state.isLoading = false;
        });
      }
    },

    logout: async () => {
      await authService.logout();
      set((state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
    },

    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading;
      }),
  })),
);
