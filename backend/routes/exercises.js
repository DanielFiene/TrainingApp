const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all exercises
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM workoutapp.exercises ORDER BY id ASC');
  res.json(result.rows);
});

// POST a new exercise
router.post('/', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    'INSERT INTO workoutapp.exercises (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(result.rows[0]);
});

// PUT to update an exercise
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await pool.query('UPDATE workoutapp.exercises SET name = $1 WHERE id = $2', [name, id]);
  res.sendStatus(204);
});

// DELETE an exercise
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM workoutapp.exercises WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;