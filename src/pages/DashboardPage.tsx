import { Typography } from 'antd';
import { TodoList } from '../components/todos/TodoList';
import { useAuthStore } from '../store/auth.store';

const { Title } = Typography;

export const DashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Title level={2}>Hello, {user?.name || user?.email}!</Title>
        <p className="text-gray-600">Manage your tasks for today</p>
      </div>

      <TodoList />
    </div>
  );
};
