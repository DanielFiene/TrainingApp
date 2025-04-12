import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WorkoutPlans() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Workout Plans</h2>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}