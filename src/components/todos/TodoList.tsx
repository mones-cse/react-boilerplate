import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { List, Card, Empty, Spin, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { todoService } from '../../services/todo.service';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import type { Todo } from '../../types';

export const TodoList = () => {
  const queryClient = useQueryClient();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: todoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('Todo created successfully');
      setIsFormVisible(false);
    },
    onError: () => {
      message.error('Failed to create todo');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      todoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('Todo updated successfully');
    },
    onError: () => {
      message.error('Failed to update todo');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: todoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('Todo deleted successfully');
    },
    onError: () => {
      message.error('Failed to delete todo');
    },
  });

  const handleCreate = (title: string) => {
    createMutation.mutate({ title });
  };

  const handleUpdate = (id: number, data: any) => {
    updateMutation.mutate({ id, data });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card>
      <div className="mb-4">
        <TodoForm
          visible={isFormVisible}
          onSubmit={handleCreate}
          onCancel={() => setIsFormVisible(false)}
          onOpen={() => setIsFormVisible(true)}
          loading={createMutation.isPending}
        />
      </div>

      {todos.length === 0 ? (
        <Empty description="No todos yet" image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <button
            onClick={() => setIsFormVisible(true)}
            className="text-blue-500 hover:text-blue-600"
          >
            <PlusOutlined /> Create your first todo
          </button>
        </Empty>
      ) : (
        <List
          dataSource={todos}
          renderItem={(todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              loading={updateMutation.isPending || deleteMutation.isPending}
            />
          )}
        />
      )}
    </Card>
  );
};
