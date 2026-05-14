const taskService = require('../services/task.service');

const getAll = (req, res) => {
  const tasks = taskService.obtenerTodas();
  res.json({ success: true, data: tasks });
};

const create = (req, res) => {
  const { title, status, priority, assignee, deadline, subtasks } = req.body;
  if (!title || typeof title !== 'string' || title.trim().length < 1) {
    return res.status(400).json({ success: false, error: 'El título es obligatorio.' });
  }
  const task = taskService.crearTarea({
    title,
    status: status || 'todo',
    priority: priority || 1,
    assignee: assignee || '',
    deadline: deadline || null,
    subtasks: subtasks || [],
  });
  res.status(201).json({ success: true, data: task });
};

const update = (req, res, next) => {
  try {
    const task = taskService.actualizarTarea(req.params.id, req.body);
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

const remove = (req, res, next) => {
  try {
    taskService.eliminarTarea(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create, update, remove };