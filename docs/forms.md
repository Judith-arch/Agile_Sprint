# Forms

## TaskForm

**Path:** `src/components/TaskForm.tsx`

---

## Controlled form

All form fields are controlled with `useState` — React is the source of truth for each input value, not the DOM.

```tsx
const [title, setTitle] = useState('');
const [deadline, setDeadline] = useState('');
const [status, setStatus] = useState<TaskStatus>('todo');
const [assignee, setAssignee] = useState('');
const [priority, setPriority] = useState<TaskPriority>(1);
```

Each input has its own `value` and `onChange`:

```tsx
<input
  value={title}
  onChange={e => setTitle(e.target.value)}
/>
```

---

## Fields

| Field | Type | Required | Default value |
|---|---|---|---|
| `title` | text | Yes | `''` |
| `deadline` | date | No | `''` |
| `status` | select | No | `'todo'` |
| `assignee` | text | No | `''` |
| `priority` | select | No | `1` (Low) |

---

## Validation

Validation is manual, with no external library. It runs inside `handleSubmit`:

```tsx
if (!title.trim()) {
  setError('Title is required.');
  return;
}
```

If there is an error, an inline red message is displayed. If validation passes, the error is cleared and `addTask` is called.

---

## Submit and reset

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim()) { setError('Title is required.'); return; }
  setError('');
  await addTask({ title, deadline: deadline || null, status, assignee, priority, subtasks: [] });
  setTitle(''); setDeadline(''); setStatus('todo'); setAssignee(''); setPriority(1);
};
```

`e.preventDefault()` prevents the browser's default behaviour (page reload). After a successful submit, all fields are reset to their initial values.

---

## Types

```ts
type TaskStatus = 'todo' | 'doing' | 'review' | 'done' | 'cancelled';
type TaskPriority = 1 | 2 | 3 | 4 | 5;
```