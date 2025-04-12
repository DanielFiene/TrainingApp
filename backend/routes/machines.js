const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all machines
router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM workoutapp.machines ORDER BY id ASC');
  res.json(result.rows);
});

// POST a new machine
router.post('/', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    'INSERT INTO workoutapp.machines (name) VALUES ($1) RETURNING *',
    [name]
  );
  res.status(201).json(result.rows[0]);
});

// PUT to update a machine
router.put('/:id', async (req, res) => {
  console.log('HIT: PUT /machines/:id');
  const { id } = req.params;
  const { name } = req.body;
  await pool.query('UPDATE workoutapp.machines SET name = $1 WHERE id = $2', [name, id]);
  res.sendStatus(204);
});

// DELETE a machine
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM workoutapp.machines WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;