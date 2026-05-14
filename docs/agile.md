# Agile, Scrum & Kanban

## What is Agile?

Agile is a set of values and principles for software development that prioritizes iterative delivery, collaboration, and adaptation to change. It is defined in the Agile Manifesto (2001) and stands in contrast to the waterfall model, where everything is planned upfront and delivered at the end.

**Core values:**
- Individuals and interactions over processes and tools
- Working software over comprehensive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a plan

---

## Scrum

Scrum is an Agile framework based on sprints (short iterations of 1 to 4 weeks). Each sprint produces a functional increment of the product.

**Roles:**
- **Product Owner** — defines and prioritizes the backlog
- **Scrum Master** — facilitates the process and removes impediments
- **Dev Team** — builds the increment

**Ceremonies:**
- **Sprint Planning** — decides what gets done in the sprint
- **Daily Standup** — daily sync (what did I do? what will I do? any blockers?)
- **Sprint Review** — demo of the increment
- **Sprint Retrospective** — process improvement discussion

**Artifacts:**
- **Product Backlog** — prioritized list of everything that needs to be built
- **Sprint Backlog** — tasks selected for the current sprint
- **Increment** — working software delivered at the end of the sprint

---

## Kanban

Kanban is a visual workflow management method. It has no sprints or fixed roles. Work is represented as cards that move across columns.

**Typical columns:** Backlog → To-do → In Progress → Review → Done

**Core principles:**
- Visualize the workflow
- Limit work in progress (WIP limits)
- Manage flow continuously
- Improve incrementally

---

## Scrum vs Kanban

| | Scrum | Kanban |
|---|---|---|
| Iterations | Fixed sprints | Continuous flow |
| Roles | Defined (PO, SM, Dev) | Not required |
| Changes | At the start of the sprint | At any time |
| Metrics | Velocity | Lead time, cycle time |
| Best for | Projects with periodic deliveries | Support, maintenance, continuous flow |

---

## Application in this project

TaskFlow uses a **Kanban** view to visualize tasks by status: To-do, Doing, Review, Done, Cancelled. The development of this module followed an informal **Agile** approach: short iterations, immediate visual feedback, and continuous adaptation to requirements.