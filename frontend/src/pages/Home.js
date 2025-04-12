import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home</h2>
      <p><button onClick={() => navigate('/workout-plans')}>Workout Plans</button></p>
      <p><button onClick={() => navigate('/configure-workout-plan')}>Configure Workout Plan</button></p>
      <p><button onClick={() => navigate('/administration')}>Administration</button></p>
      <p><button onClick={() => navigate('/options')}>Options</button></p>
    </div>
  );
}