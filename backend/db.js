const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'workoutdb',
  port: 5432
});

async function initDB() {

  await pool.query(`
    CREATE SCHEMA IF NOT EXISTS workoutapp;
  `);

  await pool.query('SET search_path TO workoutapp');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS exercises (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS machines (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS exercise_machine_mapping (
      id SERIAL PRIMARY KEY,
      exercise_id INTEGER REFERENCES workoutapp.exercises(id) ON DELETE CASCADE,
      machine_id INTEGER REFERENCES workoutapp.machines(id) ON DELETE CASCADE
    );
  `);
}

initDB().catch(err => console.error('DB Init Error:', err));

module.exports = pool;