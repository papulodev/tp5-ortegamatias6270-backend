import '@dotenvx/dotenvx/config';
import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import './models/index.js';

import sociosRouter from './routes/socios.routes.js';
import transaccionesRouter from './routes/transacciones.routes.js';
import empleadosRouter from './routes/empleados.routes.js';
import publicacionesRouter from './routes/publicaciones.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api/socios', sociosRouter);
app.use('/api/transacciones', transaccionesRouter);
app.use('/api/empleados', empleadosRouter);
app.use('/api/publicaciones', publicacionesRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'TP5 API running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Detect Sequelize unique constraint errors → 400
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: `El valor ya existe: ${err.errors?.map(e => e.message).join(', ')}`, status: 400 });
  }

  // Detect Sequelize validation errors → 400
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors?.map(e => e.message).join(', '), status: 400 });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message, status });
});

// Sync DB and start
try {
  await sequelize.sync({ alter: true });
  console.log('Database synced');
} catch (error) {
  console.error('Database sync error:', error);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
