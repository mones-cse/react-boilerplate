import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 p-8 bg-white rounded-xl shadow-xl max-w-md w-full">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        <div className="space-y-4">
          <Button
            type="primary"
            size="large"
            icon={<GoogleOutlined />}
            onClick={() => navigate('/login')}
            className="w-full"
          >
            Get Started
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          Simple, fast, and secure todo management
        </div>
      </div>
    </div>
  );
};
