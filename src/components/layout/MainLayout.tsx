import { Layout, Button, Avatar, Dropdown, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: user?.email,
      icon: <UserOutlined />,
      disabled: true,
    },
    {
      type: 'divider',
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
        <div className="text-xl font-semibold text-white">Todo App</div>

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
