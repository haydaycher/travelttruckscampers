import PropTypes from 'prop-types';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import css from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={css.pagination}>
      {currentPage < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
