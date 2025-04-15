import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import MultiDropdownHandler from '../Util/MultiDropdownHandler';

export default function ConfigureExercises() {
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [exercisesWithDummy, setExercisesWithDummy] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const [machines, setMachines] = useState([]);
  const [machineMapping, setMachineMapping] = useState({}); // from edit mode in the form
  //const [machineMappingDB, setMachineMappingDB] = useState({}); // from the database


  useEffect(() => {
    const fetchEverything = async () => {
      await fetchExercises();
      await fetchMachines();
      await fetchMappings();      
    };
    fetchEverything();
  }, []);

  const fetchExercises = async () => {
    try {
      console.log("Fetching exercises...");
      const res = await fetch("http://localhost:5000/exercises");
      const data = await res.json();
      setExercises(data);
      console.log("Exercises: ", data);
      const withDummy = [...data, {id: 'new', name: '', machines: []}];
      setExercisesWithDummy(withDummy);
      console.log("Exercises with dummy: ", withDummy);
    } catch (err) {
      console.error("Failed to fetch exercises:", err);
    }
  };

  const fetchMachines = async () => {
    try {
      const res = await fetch('http://localhost:5000/machines');
      const data = await res.json();
      console.log("Machine Names: ", data);
      setMachines(data);
    } catch (err) {
      console.error("Failed to fetch machines:", err);
    }
  };

  const fetchMappings = async () => {
    const exercisesRes = await fetch('http://localhost:5000/exercises');//just making sure that fetchMappings has the up-to-date exercises in case the dedicated exercise function hasn't returned anything yet
    const localExercises = await exercisesRes.json();
    //setExercises(exercises);//do NOT write the exercises to setExercises though, otherwise the dedicated logic in fetchExercises is circumvented - use const exercises locally only

    const mappingResults = {};

    for (const exercise of localExercises) {
      const mappings = await fetchMappingsForId(exercise.id);
      mappingResults[exercise.id] = mappings;
    }
    mappingResults['new'] = [];//add dummy line
    setMachineMapping(mappingResults);

    console.log("Mapping Results: ", mappingResults);
  };

  const fetchMappingsForId = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/exercise-machine-mapping/${id}`);
      const data = await res.json(); // e.g., [1, 3, 5]
      return data; // machine IDs
    } catch (err) {
      console.error("Failed to fetch mappings:", err);
      return [];
    }
  };

  const addExercise = async () => {
    //console.log("New Exercise: ", newExerciseName);
    //console.log("Exercise list: ", exercises);
    //console.log("Exercises with dummy: ", exercisesWithDummy);
    //console.log("editedName: ", editedName);
    //console.log("machineMapping: ", machineMapping);

    if (!newExerciseName.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name: newExerciseName}),
      });

      const newExercise = await res.json(); // assuming it returns { id: ..., name: ... }

      const machineIds = (machineMapping['new'] || []).map(m => Number(m.machine_id));

      console.log("New Exercise: ", newExercise);
      
      console.log("Machine IDs: ", machineIds);

      await fetch(`http://localhost:5000/exercise-machine-mapping/${newExercise.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ machineIds: machineIds }),
      });
      setNewExerciseName("");
      setEditedName("");
      fetchExercises();
      fetchMappings();
    } catch (err) {
      console.error("Failed to add exercise:", err);
    }
  };

  const deleteExercise = async (id) => {
    try {
      await fetch(`http://localhost:5000/exercises/${id}`, {
        method: "DELETE",
      });
      fetchExercises(); // Refresh list
    } catch (err) {
      console.error("Failed to delete exercise:", err);
    }
  };

  const saveEdit = async (id) => {
    try {
      await fetch(`http://localhost:5000/exercises/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });

      const machineIds = (machineMapping[id] || []).map(Number);

      console.log('Received machineIds:', machineIds);
      await fetch(`http://localhost:5000/exercise-machine-mapping/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ machineIds: machineIds }),
      });
      setEditingId(null);
      setEditedName("");
      fetchExercises(); // refresh list
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      <h2>Configure Exercises</h2>
      <button onClick={() => navigate('/administration')}>Back to Administration</button>


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Equipment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercisesWithDummy.map((exercise) => (
            <tr key={exercise.id}>
              <td>{exercise.id}</td>
              <td>
                {editingId === exercise.id || exercise.id === 'new' ? (
                  exercise.id === 'new'?
                  (
                    <input
                    value={newExerciseName}
                    onChange={(e) => setNewExerciseName(e.target.value)}
                  />
                  ) : (
                  <input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                  )
                ) : (
                  exercise.name
                )}
              </td>
              <td>
                {editingId === exercise.id || exercise.id === 'new' ? (
                  <>
                    <MultiDropdownHandler
                      selectedItems={(machineMapping[exercise.id] || []).map(m => m.machine_id)}
                      allOptions={machines}
                      onChange={(newSelected) =>
                        setMachineMapping((prev) => ({
                          ...prev,
                          [exercise.id]: newSelected.map(id => ({ machine_id: id }))
                        }))
                      }
                    />
                  </>
                ) : (
                  (machineMapping[exercise.id] || [])
                  .map(mapping => {
                    const match = machines.find(m => m.id === Number(mapping.machine_id));
                    return match?.name;
                  })
                    .filter(Boolean)
                    .join(', ')
                )}
              </td>
              <td>
                {
                  editingId === exercise.id || exercise.id === 'new' ? (
                    exercise.id === 'new' ? (
                      <button onClick={addExercise}>Add Exercise</button>
                    ) : (
                      <>
                        <button onClick={() => saveEdit(exercise.id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    )
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(exercise.id);
                          setEditedName(exercise.name);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteExercise(exercise.id)}>Delete</button>
                    </>
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}