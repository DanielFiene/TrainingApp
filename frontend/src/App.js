import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import WorkoutPlans from './pages/WorkoutPlans';
import ConfigureWorkoutPlan from './pages/ConfigureWorkoutPlan';
import ConfigureExercises from './pages/ConfigureExercises';
import ConfigureMachines from './pages/ConfigureMachines';
import Options from './pages/Options';
import Administration from './pages/Administration';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/configure-workout-plan" element={<ConfigureWorkoutPlan />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/administration/configure-exercises" element={<ConfigureExercises />} />
          <Route path="/administration/configure-machines" element={<ConfigureMachines />} />
          <Route path="/options" element={<Options />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;