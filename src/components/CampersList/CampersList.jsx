// CampersList.js
import React from 'react';
import { useSelector } from 'react-redux';

const CampersList = () => {
  const campers = useSelector(state => state.campers.items);

  return (
    <div>
      <h2>Campers List</h2>
      <ul>
        {Array.isArray(campers) && campers.length > 0 ? (
          campers.map(camper => (
            <li key={camper.id}>{camper.name}</li>
          ))
        ) : (
          <li>No available campers.</li>
        )}
      </ul>
    </div>
  );
};

export default CampersList;


