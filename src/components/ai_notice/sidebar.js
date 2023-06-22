import React, { useState } from 'react';
import '../../components/style/sidebar.css';

function Sidebar({ allPositions, handleFilterChange }) {
  const [selectedPositions, setSelectedPositions] = useState([]);

  const handleCheckboxChange = (event) => {
    const position = event.target.value;
    const isChecked = event.target.checked;
    let updatedPositions = [...selectedPositions];

    if (isChecked) {
      updatedPositions.push(position);
    } else {
      updatedPositions = updatedPositions.filter((selectedPosition) => selectedPosition !== position);
    }

    setSelectedPositions(updatedPositions);
    handleFilterChange(updatedPositions);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">직무</h2>
      {allPositions.map((position) => (
        <div key={position} className="position-checkbox">
          <input
            type="checkbox"
            id={position}
            value={position}
            onChange={handleCheckboxChange}
            checked={selectedPositions.includes(position)}
          />
          <label htmlFor={position}>{position}</label>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
