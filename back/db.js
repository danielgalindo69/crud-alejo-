const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'dbcarros',
  password: process.env.POSTGRES_PASSWORD || '2026',
  port: process.env.DB_PORT || 5432,
});

// Función para probar la conexión con reintentos
const connectWithRetry = async () => {
  console.log('Intentando conectar a la base de datos...');
  try {
    await pool.query('SELECT 1');
    console.log('Conectado a PostgreSQL exitosamente');
  } catch (err) {
    console.error('Error al conectar a PostgreSQL, reintentando en 5 segundos...', err.message);
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

module.exports = pool;
