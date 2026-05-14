// server/src/seeds/tasks.seed.js
// Uso: node src/seeds/tasks.seed.js
// Inyecta tareas de prueba en el backend

const API_URL = process.env.API_URL || 'http://localhost:3000/api/v1/tasks';

const seedTasks = [
  // Todo — prioridades variadas
  {
    title: 'Diseñar la landing page',
    deadline: '2026-06-10',
    status: 'todo',
    assignee: 'Judith',
    priority: 3,
    subtasks: [],
  },
  {
    title: 'Configurar variables de entorno en Vercel',
    deadline: '2026-05-20',
    status: 'todo',
    assignee: '',
    priority: 2,
    subtasks: [],
  },
  // Doing
  {
    title: 'Implementar autenticación JWT',
    deadline: '2026-06-01',
    status: 'doing',
    assignee: 'Judith',
    priority: 5,
    subtasks: [],
  },
  {
    title: 'Migrar base de datos a PostgreSQL',
    deadline: '2026-06-15',
    status: 'doing',
    assignee: 'Judith',
    priority: 4,
    subtasks: [],
  },
  // Review
  {
    title: 'Revisar pull request del módulo de filtros',
    deadline: '2026-05-16',
    status: 'review',
    assignee: 'Judith',
    priority: 2,
    subtasks: [],
  },
  // Done
  {
    title: 'Setup inicial del proyecto',
    deadline: null,
    status: 'done',
    assignee: 'Judith',
    priority: 1,
    subtasks: [],
  },
  {
    title: 'Configurar Tailwind CSS v4',
    deadline: null,
    status: 'done',
    assignee: '',
    priority: 1,
    subtasks: [],
  },
  {
    title: 'Implementar vista Kanban',
    deadline: '2026-05-01',
    status: 'done',
    assignee: 'Judith',
    priority: 3,
    subtasks: [],
  },
  // Cancelled
  {
    title: 'Integrar Stripe para pagos',
    deadline: null,
    status: 'cancelled',
    assignee: '',
    priority: 2,
    subtasks: [],
  },
  // Overdue — deadline pasado y no done/cancelled
  {
    title: 'Escribir tests unitarios para los hooks',
    deadline: '2026-04-30',
    status: 'todo',
    assignee: 'Judith',
    priority: 4,
    subtasks: [],
  },
  {
    title: 'Documentar endpoints de la API',
    deadline: '2026-04-15',
    status: 'doing',
    assignee: '',
    priority: 3,
    subtasks: [],
  },
  // Sin deadline
  {
    title: 'Investigar opciones de deploy para el backend',
    deadline: null,
    status: 'todo',
    assignee: '',
    priority: 1,
    subtasks: [],
  },
];

async function seed() {
  console.log(`\n🌱 Inyectando ${seedTasks.length} tareas en ${API_URL}\n`);

  let ok = 0;
  let fail = 0;

  for (const task of seedTasks) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(`❌ ${task.title} — ${res.status}: ${err}`);
        fail++;
      } else {
        const created = await res.json();
        console.log(`✅ ${created.title} [${created.status}] — id: ${created.id}`);
        ok++;
      }
    } catch (e) {
      console.error(`❌ ${task.title} — ${e.message}`);
      fail++;
    }
  }

  console.log(`\n✔ ${ok} tareas creadas, ${fail} errores\n`);
}

seed();