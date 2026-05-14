import type { Task, CreateTaskInput, UpdateTaskInput, ApiResponse } from '../types/task';

const BASE_URL = 'http://localhost:3000/api/v1/tasks';

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Error al obtener tareas');
  const json: ApiResponse<Task[]> = await res.json();
  return json.data;
};

export const createTask = async (data: CreateTaskInput): Promise<Task> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear tarea');
  const json: ApiResponse<Task> = await res.json();
  return json.data;
};

export const updateTask = async (id: string, data: UpdateTaskInput): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar tarea');
  const json: ApiResponse<Task> = await res.json();
  return json.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar tarea');
};