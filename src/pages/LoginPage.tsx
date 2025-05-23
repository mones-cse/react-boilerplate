import { Button, Card } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { authService } from '../services/auth.service';

export const LoginPage = () => {
  const handleGoogleLogin = () => {
    authService.googleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">
              Sign in to continue to your todos
            </p>
          </div>

          <Button
            type="primary"
            size="large"
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
            className="w-full"
          >
            Sign in with Google
          </Button>

          <p className="text-sm text-gray-500">
            By signing in, you agree to our Terms of Service
          </p>
        </div>
      </Card>
    </div>
  );
};
