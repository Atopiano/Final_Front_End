import React, { useState } from 'react';
// import { FormCheck } from 'react-bootstrap'; 주석 처리 또는 제거
import '../../components/style/sidebar.css';

function Sidebar({ allPositions, handleFilterChange }) {
  const [selectedPositions, setSelectedPositions] = useState([]);

  const handleCheckboxChange = (position) => {
    let updatedPositions = [...selectedPositions];

    if (updatedPositions.includes(position)) {
      updatedPositions = updatedPositions.filter((selectedPosition) => selectedPosition !== position);
    } else {
      updatedPositions.push(position);
    }

    setSelectedPositions(updatedPositions);
    handleFilterChange(updatedPositions);
  };

  return (
    <div className="sidebar">
      {/* <h2 className="sidebar-title">직무</h2> */}
      {allPositions.map((position) => (
        <div key={position} className="position-checkbox">
          <input
            id={position}
            type="checkbox"
            checked={selectedPositions.includes(position)}
            onChange={() => handleCheckboxChange(position)}
          />
          <label htmlFor={position}>{position}</label>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
