
import css from './CampersList.module.css';

const CampersList = ({ campers }) => {
  return (
    <div className={css.campers_list}>
      <h2>Campers List</h2>
      <ul>
        {Array.isArray(campers) && campers.length > 0 ? (
          campers.map((camper) => (
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
