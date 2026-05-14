# Project Management

## Tool: Trello

The project was organised using a Trello board following a Kanban structure adapted to the development workflow.

**Board:** [Agile_Sprint on Trello](#) *(add real link here)*

---

## Board structure

| Column | Description |
|---|---|
| **Backlog** | Everything not yet planned or of low priority |
| **To-do** | Tasks ready to start in the current iteration |
| **In Progress** | Tasks under active development |
| **Review** | Finished tasks pending review or testing |
| **Done** | Completed and verified tasks |

---

## Workflow

1. Features are defined in the Backlog as cards
2. At the start of each work session, tasks to tackle are moved to To-do
3. During development they move to In Progress
4. When finished they move to Review to verify they work correctly
5. Once verified they move to Done

---

## Project iterations

### Iteration 1 — Base
- Project setup (Vite + React + TypeScript + Tailwind)
- Express backend configuration
- Basic task CRUD

### Iteration 2 — UI
- Components: TaskCard, TaskForm, TaskList, Navbar
- Kanban view with columns
- Filters and search

### Iteration 3 — Visual improvements
- StatsPanel with circular progress and distribution bars
- Detailed Stats page
- Full dark mode

### Iteration 4 — Interactivity and polish
- Drag & drop between columns with @dnd-kit
- Visual adjustments: title truncation, fixed column widths
- Pin with opacity, styled scrollbars
- Footer