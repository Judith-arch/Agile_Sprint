# Project Idea — TaskFlow

## Description

TaskFlow is a personal and team task management web application. It allows users to create, organise, and track tasks through a Kanban view, with support for priorities, deadlines, assignment, and progress statistics.

The project is part of Module 5 of the DAW vocational training programme and aims to demonstrate the use of a modern client-server architecture with React on the frontend and Node.js + Express on the backend.

---

## Target user

Students, developers, or small teams who need a lightweight tool to organise their work without relying on complex external tools like Jira or Asana.

**Profile:**
- Familiar with Kanban workflows
- Needs quick visibility into task status
- Values simplicity and speed

---

## Core features

### Task management
- Create tasks with title, deadline, status, assignee, and priority
- Edit task status directly from the card
- Delete tasks
- Pin highlighted tasks (visual indicator via opacity)
- Checkbox to mark a task as completed

### Kanban view
- Columns: To-do, Doing, Done, Review, Cancelled
- Drag & drop between columns to change status
- Fixed column width with horizontal scroll
- Visual indicator when dragging over a column

### Filters and search
- Real-time search by title
- Sort by date ascending/descending

### Stats panel (Overview)
- Circular progress of completed tasks
- Count per status with colour indicator
- Status distribution bars
- Overdue task indicator

### Detailed stats page
- Numerical summary (total, completed, in progress, overdue)
- Global progress bar
- Breakdown by priority
- Critical tasks (deadline within 5 days or less)

### Dark mode
- Toggle in the navbar with persistence in localStorage
- Dark variants across all components

---

## Repository

GitHub: [Judith-arch/Agile_Sprint](https://github.com/Judith-arch/Agile_Sprint)