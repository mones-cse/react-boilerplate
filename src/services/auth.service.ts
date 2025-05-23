import { api } from './api';
import Cookies from 'js-cookie';

export interface User {
  id: number;
  email: string;
  name: string | null;
  picture: string | null;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export const authService = {
  googleLogin: () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google`;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await api.get('/api/v1/auth/profile');
    return data;
  },

  logout: async () => {
    try {
      await api.post('/api/v1/auth/logout');
    } finally {
      Cookies.remove('accessToken');
      window.location.href = '/login';
    }
  },

  setToken: (token: string) => {
    Cookies.set('accessToken', token, { expires: 7 });
  },
};
