const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

const logger = (req, res, next) => {
  const start = performance.now();
  res.on('finish', () => {
    console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${(performance.now() - start).toFixed(2)}ms)`);
  });
  next();
};
app.use(logger);

app.use('/api/v1/tasks', taskRoutes);

app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ success: false, error: 'Recurso no encontrado.' });
  }
  console.error(err);
  res.status(500).json({ success: false, error: 'Error interno del servidor.' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));