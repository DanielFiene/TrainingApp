import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Options() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Options</h2>
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}