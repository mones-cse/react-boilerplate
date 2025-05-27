import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Layout, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const { Header, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const menuItems: MenuProps['items'] = [
    {
      key: 'email',
      label: user?.email,
      icon: <UserOutlined />,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'profile',
      label: 'Profile Settings',
      icon: <SettingOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Layout className="w-screen">
      <Header className="bg-white shadow-sm px-4 flex items-center justify-between">
        <div
          className="text-xl font-semibold cursor-pointer"
          onKeyDown={() => navigate('/dashboard')}
        >
          Todo App
        </div>

        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Space className="cursor-pointer">
            <Avatar
              src={user?.picture}
              icon={!user?.picture && <UserOutlined />}
            />
            <span className="hidden sm:inline text-md text-gray-100">
              {user?.name || user?.email}
            </span>
          </Space>
        </Dropdown>
      </Header>

      <Content className="p-6 h-[93vh]">{children}</Content>
    </Layout>
  );
};
