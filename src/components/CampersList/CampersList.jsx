import css from './CampersList.module.css';

const CampersList = ({ campers }) => {
  return (
    <div className={css.campers_list}>
      {/* <h2>Campers List</h2> */}
      <ul>
        {Array.isArray(campers) && campers.length > 0 ? (
          campers.map((camper) => {
            console.log(camper); // Перевір у консолі структуру об'єкта

            // Отримуємо перше зображення з галереї
            const imageUrl = camper.gallery?.[0]?.thumb || '/default-image.jpg';

            return (
              <li key={camper.id}>
                <p>{camper.name}</p>
                <img src={imageUrl} alt={camper.name} width="150" />
              </li>
            );
          })
        ) : (
          <li>No available campers.</li>
        )}
      </ul>
    </div>
  );
};

export default CampersList;
