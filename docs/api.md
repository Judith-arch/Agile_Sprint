# REST API

## Base URL

```
http://localhost:3000/api/v1/tasks
```

In production, this is configured via the `VITE_API_URL` environment variable.

---

## Endpoints

### GET /api/v1/tasks
Returns all tasks.

**Response 200:**
```json
[
  {
    "id": "abc123",
    "title": "Design the navbar",
    "deadline": "2026-06-01",
    "status": "todo",
    "assignee": "Judith",
    "priority": 2,
    "pinned": false,
    "subtasks": []
  }
]
```

---

### POST /api/v1/tasks
Creates a new task.

**Body:**
```json
{
  "title": "New task",
  "deadline": "2026-06-15",
  "status": "todo",
  "assignee": "Judith",
  "priority": 1,
  "subtasks": []
}
```

**Response 201:**
```json
{
  "id": "def456",
  "title": "New task",
  "deadline": "2026-06-15",
  "status": "todo",
  "assignee": "Judith",
  "priority": 1,
  "pinned": false,
  "subtasks": []
}
```

**Validations:**
- `title` is required and cannot be empty
- `status` must be one of: `todo`, `doing`, `review`, `done`, `cancelled`
- `priority` must be a number between 1 and 5

---

### PATCH /api/v1/tasks/:id
Partially updates an existing task. Only the fields to be modified are sent.

**Example — change status:**
```json
{ "status": "done" }
```

**Example — pin task:**
```json
{ "pinned": true }
```

**Response 200:** the full updated task.

**Response 404** if the id does not exist:
```json
{ "error": "Task not found" }
```

---

### DELETE /api/v1/tasks/:id
Deletes a task.

**Response 204:** no body.

**Response 404** if the id does not exist:
```json
{ "error": "Task not found" }
```

---

## General errors

| Code | Description |
|---|---|
| 400 | Bad request — invalid data |
| 404 | Task not found |
| 500 | Internal server error |