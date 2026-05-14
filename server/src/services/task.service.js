let tasks = [];

const obtenerTodas = () => tasks;

const crearTarea = (data) => {
  const task = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    pinned: false,
    archived: false,
    ...data,
  };
  tasks.push(task);
  return task;
};

const actualizarTarea = (id, data) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error('NOT_FOUND');
  tasks[index] = { ...tasks[index], ...data };
  return tasks[index];
};

const eliminarTarea = (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error('NOT_FOUND');
  tasks.splice(index, 1);
};

module.exports = { obtenerTodas, crearTarea, actualizarTarea, eliminarTarea };