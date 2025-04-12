import React from 'react';

export default function MultiDropdownHandler({
  selectedItems,
  allOptions,
  onChange,
}) {
  const handleSelectionChange = (index, newValue) => {
    if (newValue === '__remove__') {
      // Remove the dropdown at the given index
      const updated = selectedItems.filter((_, i) => i !== index);
      onChange(updated);
    } else {
      // Update selected value at the given index
      const updated = [...selectedItems];
      updated[index] = newValue;
      onChange(updated);
    }
  };

  const addDropdown = () => {
    onChange([...selectedItems, '']);
  };

  return (
    <div>
      {selectedItems.map((value, index) => (
        <select
          key={index}
          value={value}
          onChange={(e) => handleSelectionChange(index, e.target.value)}
          style={{ display: 'block', marginBottom: '0.5rem' }}
        >
          <option value="">-- Select an option --</option>
          {allOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
          <option value="__remove__">-- Remove this entry --</option>
        </select>
      ))}
      <button onClick={addDropdown}>+</button>
    </div>
  );
}