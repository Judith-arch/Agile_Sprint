export type TaskStatus = 'todo' | 'doing' | 'review' | 'done' | 'cancelled';

export type TaskPriority = 1 | 2 | 3 | 4 | 5;

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  readonly id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  deadline: string | null;
  pinned: boolean;
  archived: boolean;
  subtasks: Subtask[];
  createdAt: string;
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'pinned' | 'archived'>;

export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt'>>;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}