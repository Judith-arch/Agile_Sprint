# Retrospective — Module 5

**Project:** TaskFlow  
**Repository:** [Judith-arch/Agile_Sprint](https://github.com/Judith-arch/Agile_Sprint)

---

## What went well?

- The layered backend architecture (routes → controllers → services) ended up clean and easy to extend
- Context API was sufficient for the scope of the project — there was no need to add Redux or Zustand
- Tailwind v4 with the `@variant dark` directive greatly simplified dark mode without requiring a config file
- Drag & drop with `@dnd-kit` was easier to integrate than alternatives like `react-beautiful-dnd` (now abandoned)
- The separation between `useTasks` (global state) and `useFilter` (local filter logic) kept components clean

---

## What was difficult?

- Tailwind v4 does not use `tailwind.config.js` — dark mode with `darkMode: 'class'` did not work until discovering that `@variant dark` must be declared in the CSS
- `@dnd-kit` has a default "bounce" animation when dropping into a new column that had to be disabled with `dropAnimation={null}`
- The TypeScript types from `@dnd-kit` export `DragEndEvent` as a type and not as a value — it must be imported with `import type`
- Text truncation with Tailwind (`truncate`) does not work inside flex containers without adding `min-w-0` to the parent element

---

## Decisions and adjustments during development

### StatsPanel
The initial stats panel had too much empty space. It was redesigned by adding a status distribution bar section that fills the remaining space with `flex-1`, adapting to the form height without hardcoding values.

### Dark mode
The SVG circle in the progress component used a hardcoded `stroke="#e5e7eb"`. It was changed to `stroke="currentColor"` with the Tailwind classes `text-gray-200 dark:text-gray-700` so it respects dark mode.

### TaskCard
Long titles overflowed the card because they were inside a `flex-wrap` container without `min-w-0`. The card layout was restructured into separate rows (title, badge, metadata) and `min-w-0` was added so `truncate` would work correctly.

### Pin visual
Instead of showing an additional emoji when pinning, the pin button opacity is controlled — reduced opacity when not pinned, full opacity when pinned. Cleaner visually and without altering the card height.

---

## Use of AI during development

AI (Claude by Anthropic) was used as a development assistant throughout the module. Its main uses were:

- **Debugging:** identifying why certain Tailwind patterns were not working (dark mode in v4, truncate without min-w-0)
- **Boilerplate generation:** initial structure of components and hooks
- **Architecture decisions:** choice of drag & drop library, backend layer structure
- **Documentation:** generation of `docs/` files based on the actual project code

The process was iterative — generated code was reviewed, tested in the browser, and adjusted based on the real visual result.

---

## What I would improve with more time?

- Add real persistence with a database (PostgreSQL + Prisma or MongoDB)
- Automated tests with Vitest for hooks and utils
- Export tasks to CSV/JSON
- Functional subtasks (the type is already defined but not used in the UI)
- Smoother card entry/exit animations
- Tasks can currently be added without filling in all fields — add stricter validation
- Improve the statistics page
- Move the overview numbers to the right of each category label for better readability
- Add a calendar view
- Add a task detail sidebar that slides in from the right, allowing the task to be edited and including a text area to document progress
  - Once implemented, add a button at the bottom of each Kanban column to quickly add a task to that category and open its detail sidebar to fill in the information
- Add a seed file to inject sample tasks for comfortable testing
