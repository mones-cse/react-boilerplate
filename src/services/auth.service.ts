import Cookies from 'js-cookie';
import { api } from './api';

export interface User {
  id: number;
  email: string;
  name: string | null;
  picture: string | null;
  emailVerified: boolean;
  hasPassword: boolean;
  hasGoogleAccount: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      '/api/v1/auth/register',
      data,
    );
    authService.setToken(response.data.accessToken);
    return response.data;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/v1/auth/login', data);
    authService.setToken(response.data.accessToken);
    return response.data;
  },

  changePassword: async (
    data: ChangePasswordData,
  ): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(
      '/api/v1/auth/change-password',
      data,
    );
    return response.data;
  },

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

  // 1st time google loggedin use set password
  setPassword: async (newPassword: string): Promise<void> => {
    await api.post('/api/v1/auth/set-password', { newPassword });
  },
};
