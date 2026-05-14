# Routing

## Library

React Router DOM v6 with `BrowserRouter` and `Routes`.

---

## Defined routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Main view with form, stats panel, and kanban board |
| `/stats` | `Stats` | Detailed statistics page |
| `*` | `NotFound` | 404 page for undefined routes |

---

## Configuration in App.tsx

```tsx
<BrowserRouter>
  <TaskProvider>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </TaskProvider>
</BrowserRouter>
```

`Navbar` and `Footer` are outside `Routes` so they appear on every page.

---

## Navigation

Navigation links are in `Navbar.tsx` using React Router's `Link` component:

```tsx
<Link to="/">Tasks</Link>
<Link to="/stats">Stats</Link>
```

`Link` avoids full page reloads — navigation is client-side (SPA).

---

## 404 page

`NotFound.tsx` is rendered for any undefined route thanks to the `path="*"` wildcard. It shows a friendly message and a link back to the home page.