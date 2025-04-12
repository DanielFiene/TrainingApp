const express = require('express');
const db = require('./db');
const cors = require('cors');
const exerciseRoutes = require('./routes/exercises');
const machineRoutes = require('./routes/machines');
const exerciseMachineMappingRoutes = require('./routes/exerciseMachineMapping');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Workout App Backend Running!');
});

app.use('/exercises', exerciseRoutes);
app.use('/machines', machineRoutes);
app.use('/exercise-machine-mapping', exerciseMachineMappingRoutes);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});