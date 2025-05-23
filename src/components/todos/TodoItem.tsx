import { useState } from 'react';
import { List, Checkbox, Button, Input, Space, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type { Todo } from '../../types';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, data: any) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  onDelete,
  loading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdate(todo.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <List.Item
      className={`${todo.completed ? 'opacity-60' : ''}`}
      actions={
        !isEditing
          ? [
              <Button
                icon={<EditOutlined />}
                size="small"
                onClick={() => setIsEditing(true)}
                disabled={loading}
              />,
              <Popconfirm
                title="Delete this todo?"
                onConfirm={() => onDelete(todo.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  disabled={loading}
                />
              </Popconfirm>,
            ]
          : [
              <Button
                icon={<CheckOutlined />}
                size="small"
                type="primary"
                onClick={handleSaveEdit}
                disabled={loading}
              />,
              <Button
                icon={<CloseOutlined />}
                size="small"
                onClick={handleCancelEdit}
                disabled={loading}
              />,
            ]
      }
    >
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={loading || isEditing}
        />
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onPressEnter={handleSaveEdit}
            className="flex-1"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>
    </List.Item>
  );
};
