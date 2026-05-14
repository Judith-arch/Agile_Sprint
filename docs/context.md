# TaskContext

**Path:** `src/context/TaskContext.tsx`

## Description

`TaskContext` is the global state of the application. It centralises the task list and all operations on it (fetch, create, edit, delete). Any component inside the `TaskProvider` can access this state without prop drilling.

---

## Provider

```tsx
// App.tsx
<TaskProvider>
  <App />
</TaskProvider>
```

The `TaskProvider` wraps the entire application in `App.tsx`. On mount, it performs an initial fetch to load tasks from the backend.

---

## Usage in components

```tsx
import { useTasks } from '../hooks/useTasks';

const { tasks, loading, error, addTask, editTask, removeTask } = useTasks();
```

Do not import `TaskContext` directly — always use the `useTasks` hook.

---

## State shape

```ts
{
  tasks: Task[];        // list of tasks
  loading: boolean;     // true during the initial fetch
  error: string | null; // error message if the API call fails
}
```

---

## Operations

### addTask
Makes a POST request to the API and adds the task to the local state.

```ts
await addTask({
  title: 'New task',
  deadline: '2026-06-01',
  status: 'todo',
  assignee: 'Judith',
  priority: 2,
  subtasks: [],
});
```

### editTask
Makes a PATCH request to the API with the fields to modify and updates the local state.

```ts
await editTask(task.id, { status: 'done' });
await editTask(task.id, { pinned: true });
```

### removeTask
Makes a DELETE request to the API and removes the task from the local state.

```ts
await removeTask(task.id);
```

---

## Synchronisation pattern

Operations follow a **fetch after mutation** pattern — after each operation the local state is updated immediately so the UI responds without needing to reload all tasks from the server.