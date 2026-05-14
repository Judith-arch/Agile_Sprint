import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import * as api from '../api/client';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (data: CreateTaskInput) => Promise<void>;
  editTask: (id: string, data: UpdateTaskInput) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTasks();
      setTasks(data);
    } catch {
      setError('No se pudieron cargar las tareas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

const addTask = useCallback(async (data: CreateTaskInput) => {
  const task = await api.createTask(data);
  setTasks(prev => [...prev, task]);
}, []);

const editTask = useCallback(async (id: string, data: UpdateTaskInput) => {
  const task = await api.updateTask(id, data);
  setTasks(prev => prev.map(t => t.id === id ? task : t));
}, []);

const removeTask = useCallback(async (id: string) => {
  await api.deleteTask(id);
  setTasks(prev => prev.filter(t => t.id !== id));
}, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
};