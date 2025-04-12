import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Administration() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Administration</h2>
      <p><button onClick={() => navigate('/')}>Back to Home</button></p>
      <p><button onClick={() => navigate('/administration/configure-exercises')}>Configure Exercises</button></p>
      <p><button onClick={() => navigate('/administration/configure-machines')}>Configure Machines</button></p>
    </div>
  );
}