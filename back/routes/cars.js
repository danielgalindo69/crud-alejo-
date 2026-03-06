const express = require('express');
const router = express.Router();
const pool = require('../db');

// List all cars
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM carros ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a car
router.post('/', async (req, res) => {
  const { marca, modelo, anio, color } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO carros (marca, modelo, anio, color) VALUES ($1, $2, $3, $4) RETURNING *',
      [marca, modelo, anio, color]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a car
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, anio, color } = req.body;
  try {
    const result = await pool.query(
      'UPDATE carros SET marca = $1, modelo = $2, anio = $3, color = $4 WHERE id = $5 RETURNING *',
      [marca, modelo, anio, color, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a car
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM carros WHERE id = $1', [id]);
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
