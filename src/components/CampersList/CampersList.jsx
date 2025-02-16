import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/favs/actions.js';
import Pagination from '../Pagination/Pagination';
import {
  selectLoading,
  selectError,
} from '../../redux/campers/campers.selectors';
import { selectFilteredCampers } from '../../redux/campers/selectFilteredCampers';

const CampersList = ({ filters, onPageChange }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const filteredCampers = useSelector((state) =>
    selectFilteredCampers(state, filters),
  );
  const itemsPerPage = 4;

  const handleAddFav = (id) => {
    dispatch(addToFavorites(id));
  };

  const handleRemoveFav = (id) => {
    dispatch(removeFromFavorites(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {' '}
      <ul>
        {' '}
        {filteredCampers.slice(0, itemsPerPage).map((camper) => (
          <li key={camper.id}>
            {' '}
            <h3>{camper.name}</h3> <p>{camper.location}</p>{' '}
            <p>{camper.form || camper.type}</p>{' '}
            <div>
              {' '}
              {(camper.features || []).map((feature, index) => (
                <span key={index}>{feature} </span>
              ))}{' '}
            </div>{' '}
            <button onClick={() => handleAddFav(camper.id)}>
              Add to Favorites
            </button>{' '}
            <button onClick={() => handleRemoveFav(camper.id)}>
              Remove from Favorites
            </button>{' '}
          </li>
        ))}{' '}
      </ul>{' '}
      <Pagination
        currentPage={filters.page}
        totalPages={Math.ceil(filteredCampers.length / itemsPerPage)}
        onPageChange={onPageChange}
      />{' '}
    </div>
  );
};

export default CampersList;
