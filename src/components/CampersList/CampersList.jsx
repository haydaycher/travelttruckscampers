import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCampers } from '../../redux/campers/campers.slice';
import { fetchCampers } from '../../redux/operations'; // Імпортуємо fetchCampers

const CampersList = () => {
  const dispatch = useDispatch();
  const campers = useSelector(state => state.campers.items);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampersData = async () => {
      try {
        // Використовуємо fetchCampers з operations.js
        await dispatch(fetchCampers()); // викликаємо async-thunk
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchCampersData();
  }, [dispatch]);

  return (
    <div>
      <h2>Campers List</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {Array.isArray(campers) && campers.length > 0 ? (
            campers.map(camper => (
              <li key={camper.id}>{camper.name}</li>
            ))
          ) : (
            <li>No available campers.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CampersList;


