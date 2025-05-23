import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spin } from 'antd';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'react-toastify';

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { fetchProfile } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');

      if (!token) {
        toast.error('Authentication failed');
        navigate('/login');
        return;
      }

      try {
        // Store the token
        authService.setToken(token);

        // Fetch user profile
        await fetchProfile();

        // Redirect to dashboard
        navigate('/dashboard');
        toast.success('Successfully logged in!');
      } catch (error) {
        toast.error('Failed to authenticate');
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, fetchProfile]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">Authenticating...</p>
      </div>
    </div>
  );
};
