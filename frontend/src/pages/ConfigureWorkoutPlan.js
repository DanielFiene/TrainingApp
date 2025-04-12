import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfigureWorkoutPlan() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Configure Workout Plan</h2>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}