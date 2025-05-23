import { api } from './api';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoDto {
  title: string;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await api.get('/api/v1/todos');
    return data;
  },

  getById: async (id: number): Promise<Todo> => {
    const { data } = await api.get(`/api/v1/todos/${id}`);
    return data;
  },

  create: async (dto: CreateTodoDto): Promise<Todo> => {
    const { data } = await api.post('/api/v1/todos', dto);
    return data;
  },

  update: async (id: number, dto: UpdateTodoDto): Promise<Todo> => {
    const { data } = await api.patch(`/api/v1/todos/${id}`, dto);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/v1/todos/${id}`);
  },
};
