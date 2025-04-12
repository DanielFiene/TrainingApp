const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all machines for exercise id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM workoutapp.exercise_machine_mapping WHERE exercise_id = $1', [id]);
  res.json(result.rows);
});

// POST a new mapping
router.post('/', async (req, res) => {
    const { machine_id, exercise_id } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO workoutapp.exercise_machine_mapping (exercise_id, machine_id) VALUES ($1, $2) RETURNING *',
        [exercise_id, machine_id]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting mapping:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.put('/:exerciseId', async (req, res) => {
  console.log('HIT: PUT /exercise-machine-mapping/:exerciseId/machines');
  const { exerciseId } = req.params;
  const { machineIds } = req.body; // Expecting an array of machine IDs

  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start the transaction

    // Delete old mappings
    await client.query(
      'DELETE FROM workoutapp.exercise_machine_mapping WHERE exercise_id = $1',
      [exerciseId]
    );

    // Insert new mappings
    for (const machineId of machineIds) {
      await client.query(
        'INSERT INTO workoutapp.exercise_machine_mapping (exercise_id, machine_id) VALUES ($1, $2)',
        [exerciseId, machineId]
      );
    }

    await client.query('COMMIT'); // Commit the transaction

    res.status(200).json({ message: 'Mappings updated successfully' });
  } catch (err) {
    await client.query('ROLLBACK'); // Undo all changes on error
    console.error('Failed to update exercise-machine mappings:', err);
    res.status(500).json({ error: 'Failed to update mappings' });
  } finally {
    client.release(); // Release the client back to the pool
  }
});

// DELETE a mapping
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM workoutapp.exercise_machine_mapping WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;