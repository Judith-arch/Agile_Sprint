# Design & Architecture

## General architecture

```
Frontend (React)  <-->  REST API (Express)  <-->  In-memory store
localhost:5173          localhost:3000
```

The frontend consumes the API via typed fetch calls. The backend keeps data in memory (array in `task.service.js`). There is no persistent database — data is lost when the server restarts.

---

## Frontend

**Stack:** React 18 + TypeScript + Tailwind CSS v4 + Vite

### Layers

```
src/
├── api/          network layer — typed fetch calls using VITE_API_URL
├── context/      global state — TaskContext with useState
├── hooks/        reusable logic — useFilter, useTasks
├── components/   UI — visual pieces with no business logic
├── pages/        views — Home, Stats, NotFound
├── types/        shared TypeScript types
└── utils/        helpers — dateUtils (date-fns)
```

### Data flow

```
TaskContext (global state)
    |
    |-- useTasks() --> components (TaskCard, TaskForm, StatsPanel...)
    |
    |-- useFilter() --> TaskList (search + sort)
```

---

## Backend

**Stack:** Node.js + Express + layered architecture

```
server/src/
├── index.js              entry point — express, cors, logger, error handler
├── config/env.js         dotenv + variable validation
├── routes/               route definitions
├── controllers/          network boundary validation
└── services/             business logic + in-memory data store
```

### Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /api/v1/tasks | Get all tasks |
| POST | /api/v1/tasks | Create a task |
| PATCH | /api/v1/tasks/:id | Edit a task |
| DELETE | /api/v1/tasks/:id | Delete a task |

---

## Design decisions

- **In-memory store** — sufficient for the scope of this module, no database overhead
- **Context API** instead of Redux — the state is simple and does not justify an external library
- **Tailwind v4** — no `tailwind.config.js`, configured via the `@tailwindcss/vite` plugin
- **@dnd-kit** instead of react-beautiful-dnd — react-beautiful-dnd is no longer maintained
- **date-fns** for date handling — lightweight and tree-shakeable