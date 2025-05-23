import { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface TodoFormProps {
  visible: boolean;
  onSubmit: (title: string) => void;
  onCancel: () => void;
  onOpen: () => void;
  loading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  visible,
  onSubmit,
  onCancel,
  onOpen,
  loading,
}) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle('');
    }
  };

  if (!visible) {
    return (
      <Button type="primary" icon={<PlusOutlined />} onClick={onOpen} block>
        Add Todo
      </Button>
    );
  }

  return (
    <Space.Compact className="w-full">
      <Input
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onPressEnter={handleSubmit}
        disabled={loading}
        autoFocus
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        loading={loading}
        disabled={!title.trim()}
      >
        Add
      </Button>
      <Button onClick={onCancel} disabled={loading}>
        Cancel
      </Button>
    </Space.Compact>
  );
};
