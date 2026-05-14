# Component Documentation

## Navbar

**Path:** `src/components/Navbar.tsx`

Top navigation bar. Contains the logo, navigation links, and the dark mode toggle.

- Persists the theme preference in `localStorage`
- Applies/removes the `dark` class on `document.documentElement`
- Uses `useState` for the theme state and `useEffect` to sync with the DOM

---

## TaskForm

**Path:** `src/components/TaskForm.tsx`

Controlled form for creating new tasks.

**Fields:** title (required), deadline, status, assignee, priority

- Validation: title cannot be empty
- On submit, calls `addTask` from the context and resets the form
- Shows an inline error message if validation fails

---

## TaskList

**Path:** `src/components/TaskList.tsx`

Main Kanban view. Renders the columns and manages drag & drop.

- Uses `DndContext` from `@dnd-kit/core` as a wrapper
- Each column is a `DroppableColumn`
- The `DragOverlay` shows a ghost card while dragging
- On drop (`onDragEnd`), calls `editTask` with the new status
- Includes a search bar and a sort-by-date button

---

## DroppableColumn

**Path:** `src/components/DroppableColumn.tsx`

Kanban column that accepts drops. Wrapper around `useDroppable` from `@dnd-kit`.

- Receives `col` (label + value), `tasks`, and `colorClass`
- Shows a yellow ring (`ring-amber-400`) when a card is hovering over it
- Uses `SortableContext` internally to order cards

---

## SortableTaskCard

**Path:** `src/components/SortableTaskCard.tsx`

Wrapper around `TaskCard` that adds drag behaviour. Uses `useSortable` from `@dnd-kit/sortable`.

- Applies `transform` and `transition` for the movement animation
- Reduces opacity to 0.4 while the card is being dragged

---

## TaskCard

**Path:** `src/components/TaskCard.tsx`

Individual task card.

**Shows:** title (truncated), deadline badge, priority stars, assignee, date, pin and delete buttons

- Background colour varies by status (`STATUS_COLORS`)
- The pin button has reduced opacity when the task is not pinned
- The checkbox marks/unmarks the task as done
- Full dark mode support

---

## StatsPanel

**Path:** `src/components/StatsPanel.tsx`

Statistics summary panel. Displayed on `Home` alongside the form.

- Animated circular progress built with SVG
- Grid of per-status counts with colour dots
- Status distribution bars with width animation
- Adapts its height to the form via `h-full` and `flex-1`

---

## FilterBar

**Path:** `src/components/FilterBar.tsx`

Status filter and search bar. Auxiliary component (the main search is integrated directly into `TaskList`).

---

## Footer

**Path:** `src/components/Footer.tsx`

Simple footer with project information and a link to the GitHub repository.