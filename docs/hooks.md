# Hooks

## useTasks

**Path:** `src/hooks/useTasks.ts`

Re-export of the context. Allows any component to access the global task state without importing `TaskContext` directly.

```ts
import { useTasks } from '../hooks/useTasks';

const { tasks, loading, error, addTask, editTask, removeTask } = useTasks();
```

**Exposed values:**

| Value | Type | Description |
|---|---|---|
| `tasks` | `Task[]` | List of all tasks |
| `loading` | `boolean` | Initial loading state |
| `error` | `string \| null` | Error message if the request fails |
| `addTask` | `(data) => Promise<void>` | Create a task |
| `editTask` | `(id, changes) => Promise<void>` | Edit a task |
| `removeTask` | `(id) => Promise<void>` | Delete a task |

---

## useFilter

**Path:** `src/hooks/useFilter.ts`

Manages task search and sorting. Receives the task array and returns the filtered array plus controls.

```ts
import { useFilter } from '../hooks/useFilter';

const { search, setSearch, sortAsc, setSortAsc, filtered } = useFilter(tasks);
```

**Exposed values:**

| Value | Type | Description |
|---|---|---|
| `search` | `string` | Current search text |
| `setSearch` | `(s: string) => void` | Updates the search text |
| `sortAsc` | `boolean` | Ascending date order when true |
| `setSortAsc` | `(v: boolean) => void` | Toggles the sort order |
| `filtered` | `Task[]` | Filtered and sorted tasks |

**Internal logic:**
- Uses `useMemo` to recompute only when `tasks`, `search`, or `sortAsc` change
- Filters by `task.title.toLowerCase().includes(search.toLowerCase())`
- Sorts by `task.deadline` — tasks without a deadline are pushed to the end