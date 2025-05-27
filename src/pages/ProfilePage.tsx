import {
  CheckCircleOutlined,
  GoogleOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Typography,
} from 'antd';
import { useState } from 'react';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';

const { Title, Text } = Typography;

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ProfilePage = () => {
  const { user, fetchProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onChangePassword = async (values: ChangePasswordForm) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('New passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success('Password changed successfully');
      form.resetFields();
      await fetchProfile(); // Refresh user data
    } catch (error: any) {
      message.error(
        error.response?.data?.message || 'Failed to change password',
      );
    } finally {
      setLoading(false);
    }
  };

  const onSetPassword = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await authService.setPassword(values.newPassword);
      message.success('Password set successfully');
      form.resetFields();
      await fetchProfile(); // Refresh user data
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to set password');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkGoogle = () => {
    authService.googleLogin();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Title level={2}>Profile Settings</Title>

      {/* User Info Card */}
      <Card className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar
            size={64}
            src={user?.picture}
            icon={!user?.picture && <UserOutlined />}
          />
          <div>
            <h3 className="text-lg font-semibold">
              {user?.name || 'No name set'}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
            <div className="flex items-center gap-2 mt-1">
              {user?.emailVerified && (
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <CheckCircleOutlined /> Email verified
                </span>
              )}
            </div>
          </div>
        </div>

        <Divider />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Text>Password Authentication</Text>
            {user?.hasPassword ? (
              <span className="text-green-600">Enabled</span>
            ) : (
              <span className="text-gray-400">Not set</span>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Text>Google Account</Text>
            {user?.hasGoogleAccount ? (
              <span className="text-green-600 flex items-center gap-1">
                <GoogleOutlined /> Connected
              </span>
            ) : (
              <Button
                size="small"
                icon={<GoogleOutlined />}
                onClick={handleLinkGoogle}
              >
                Link Google Account
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Change Password Card */}
      {user?.hasPassword && (
        <Card title="Change Password">
          <Form
            form={form}
            name="changePassword"
            onFinish={onChangePassword}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your current password',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Current Password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="New Password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your new password',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm New Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      {/* Set Password Card - for users who only have Google auth */}
      {!user?.hasPassword && user?.hasGoogleAccount && (
        <Card title="Set Password">
          <p className="text-gray-600 mb-4">
            You're currently using Google to sign in. Set a password to also
            sign in with email.
          </p>
          <Form
            form={form}
            name="setPassword"
            onFinish={onSetPassword} // Use the new handler
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: 'Please input a password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="New Password"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your password' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Set Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};
