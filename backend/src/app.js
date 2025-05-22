const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/expenses', expenseRoutes); // expenseRoutes debe ser un router válido

// Iniciar servidor
db.then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
}).catch(err => console.error('Error con la DB:', err));