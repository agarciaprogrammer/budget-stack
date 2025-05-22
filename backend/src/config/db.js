// backend/src/config/db.js
const { createConnection } = require('typeorm');
const Expense = require('../models/Expense');

module.exports = createConnection({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'budget_tracker',
  entities: [Expense],
  synchronize: true, // ¡Cuidado! Solo para desarrollo (auto-crea tablas)
  logging: true, // Muestra queries SQL en consola
});