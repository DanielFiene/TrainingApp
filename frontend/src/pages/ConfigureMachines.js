import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function ConfigureMachines() {
  const navigate = useNavigate();

  const [machines, setMachines] = useState([]);
  const [newMachineName, setNewMachineName] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const res = await fetch("http://localhost:5000/machines");
      const data = await res.json();
      setMachines(data);
    } catch (err) {
      console.error("Failed to fetch machines:", err);
    }
  };

  const addMachine = async () => {
    if (!newMachineName.trim()) return;
    try {
      await fetch("http://localhost:5000/machines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newMachineName }),
      });
      setNewMachineName("");
      fetchMachines();
    } catch (err) {
      console.error("Failed to add machine:", err);
    }
  };

  const deleteMachine = async (id) => {
    try {
      await fetch(`http://localhost:5000/machines/${id}`, {
        method: "DELETE",
      });
      fetchMachines(); // Refresh list
    } catch (err) {
      console.error("Failed to delete machine:", err);
    }
  };

  const saveEdit = async (id) => {
    try {
      await fetch(`http://localhost:5000/machines/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editedName }),
      });
      setEditingId(null);
      fetchMachines(); // refresh list
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div>
      <h2>Configure Machines</h2>
      <button onClick={() => navigate('/administration')}>Back to Administration</button>


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id}>
              <td>{machine.id}</td>
              <td>
                {editingId === machine.id ? (
                  <input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  machine.name
                )}
              </td>
              <td>
                {editingId === machine.id ? (
                  <>
                    <button onClick={() => saveEdit(machine.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(machine.id);
                      setEditedName(machine.name);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button onClick={() => deleteMachine(machine.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                value={newMachineName}
                onChange={(e) => setNewMachineName(e.target.value)}
                placeholder="Machine name"
              />
            </td>
            <td>
              <button onClick={addMachine}>Add Machine</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}