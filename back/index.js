const express = require('express');
const cors = require('cors');
const carRoutes = require('./routes/cars');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Middleware de logging para depuración
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Body:', req.body);
  }
  next();
});

app.use('/api/cars', carRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
