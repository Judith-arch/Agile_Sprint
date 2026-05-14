# Testing

## Strategy

The project uses **manual testing** — there are no automated tests. Tests are performed directly in the browser and with developer tools.

---

## Functional tests

### Create task
| Case | Action | Expected result |
|---|---|---|
| Empty title | Submit form without a title | Error message "Title is required" |
| Valid title | Fill in title and submit | Task appears in the To-do column |
| With deadline | Add a date and submit | Deadline badge visible on the card |
| With priority | Select priority and submit | Correct stars shown on the card |

### Edit task
| Case | Action | Expected result |
|---|---|---|
| Mark as done | Card checkbox | Card moves visually, status changes |
| Pin | Pin button | Icon switches to full opacity |
| Drag & drop | Drag card to another column | Card appears in the new column |

### Delete task
| Case | Action | Expected result |
|---|---|---|
| Delete | Trash button | Task disappears from the UI |

### Search and filters
| Case | Action | Expected result |
|---|---|---|
| Search | Type in the search input | Only matching tasks are shown |
| Sort | Date button | Columns reorder by deadline |

### Dark mode
| Case | Action | Expected result |
|---|---|---|
| Enable | Click moon icon | Entire UI switches to dark |
| Persistence | Reload page | Dark mode is preserved |

---

## Error cases

| Case | How to test | Expected result |
|---|---|---|
| Backend down | Stop the server and reload | Error message visible in the UI |
| Non-existent ID | PATCH/DELETE with a fake id via curl | UI does not break, error is shown |
| Invalid field | POST with priority out of range | Server returns 400 |

---

## Tools used

- **Browser** — visual inspection of the UI
- **DevTools Network** — verify requests are made correctly and status codes are as expected
- **DevTools Console** — detect JS or network errors
- **curl / Postman** — test endpoints directly without going through the frontend

### curl examples
```bash
# Create task
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","status":"todo","priority":1,"assignee":"","subtasks":[]}'

# Change status
curl -X PATCH http://localhost:3000/api/v1/tasks/ID \
  -H "Content-Type: application/json" \
  -d '{"status":"done"}'

# Delete
curl -X DELETE http://localhost:3000/api/v1/tasks/ID
```