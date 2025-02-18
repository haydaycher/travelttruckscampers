import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/favs/actions';
import Pagination from '../Pagination/Pagination';
import {
  selectLoading,
  selectError,
} from '../../redux/campers/campers.selectors';
import { selectFilteredCampers } from '../../redux/campers/selectFilteredCampers';
import css from './CampersList.module.css';

// const CampersList = ({ filters, onPageChange }) => {
//   const dispatch = useDispatch();
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   const filteredCampers = useSelector((state) =>
//     selectFilteredCampers(state, filters),
//   );
//   const itemsPerPage = 4;

//   const handleAddFav = (id) => {
//     dispatch(addToFavorites(id));
//   };

//   const handleRemoveFav = (id) => {
//     dispatch(removeFromFavorites(id));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <ul>
//         {filteredCampers.slice(0, itemsPerPage).map((camper) => (
//           <li key={camper.id}>
//             <h3>{camper.name}</h3>
//             <p>{camper.location}</p>
//             <p>{camper.form || camper.type}</p>
//             <div>
//               {(camper.features || []).map((feature, index) => (
//                 <span key={index}>{feature} </span>
//               ))}
//             </div>
//             <button onClick={() => handleAddFav(camper.id)}>
//               Add to Favorites
//             </button>
//             <button onClick={() => handleRemoveFav(camper.id)}>
//               Remove from Favorites
//             </button>
//           </li>
//         ))}
//       </ul>
// <Pagination
//   currentPage={filters.page}
//   totalPages={Math.ceil(filteredCampers.length / itemsPerPage)}
//   onPageChange={onPageChange}
// />
//     </div>
//   );
// };

// export default CampersList;

const CampersList = ({ items, filters, onPageChange }) => {
  const itemsPerPage = 4;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className={css.campers_list}>
      <ul>
        {items
          .slice((filters.page - 1) * itemsPerPage, filters.page * itemsPerPage)
          .map((camper) => (
            <li key={camper.id} className={css.campers_item}>
              <h3 className={css.camper_name}>{camper.name}</h3>
              <img
                className={css.camper_image}
                src={camper.gallery[0].thumb}
                alt={camper.name}
              />
              <div className={css.camper_info}>
                <p>{camper.location}</p>
                <p>{camper.description}</p>
                <p>Price: ${camper.price}</p>
                <p>Rating: {camper.rating}</p>
                <p>Transmission: {camper.transmission}</p>
              </div>
            </li>
          ))}
      </ul>
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default CampersList;
