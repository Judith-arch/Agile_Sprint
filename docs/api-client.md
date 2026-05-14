# API Client

**Path:** `src/api/client.ts`

---

## Description

A typed network layer that abstracts all fetch calls to the backend. All components and the context use these functions — no component makes a fetch call directly.

The base URL is read from the `VITE_API_URL` environment variable, defined in `.env`:

```
VITE_API_URL=http://localhost:3000/api/v1/tasks
```

---

## Functions

### getTasks
```ts
getTasks(): Promise<Task[]>
```
Makes a GET request to the API and returns the typed task array.

### createTask
```ts
createTask(data: Omit<Task, 'id' | 'pinned'>): Promise<Task>
```
Makes a POST request with the form data and returns the created task with its server-assigned id.

### updateTask
```ts
updateTask(id: string, changes: Partial<Task>): Promise<Task>
```
Makes a PATCH request with only the modified fields. Useful for changing status, pinning, etc.

### deleteTask
```ts
deleteTask(id: string): Promise<void>
```
Makes a DELETE request. Returns no body.

---

## Types aligned with the API

```ts
// src/types/task.ts
export type TaskStatus = 'todo' | 'doing' | 'review' | 'done' | 'cancelled';
export type TaskPriority = 1 | 2 | 3 | 4 | 5;

export interface Task {
  id: string;
  title: string;
  deadline: string | null;
  status: TaskStatus;
  assignee: string;
  priority: TaskPriority;
  pinned: boolean;
  subtasks: Subtask[];
}
```

The frontend types and the JSON shape returned by the API are aligned — if the API changes a field, `task.ts` must be updated accordingly.

---

## Error handling

If the response is not `ok` (status >= 400), the client throws an error with the server's message. The `TaskContext` catches it and exposes it via the `error` state so it can be displayed in the UI.