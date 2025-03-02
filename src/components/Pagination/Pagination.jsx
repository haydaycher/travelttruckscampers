import PropTypes from 'prop-types';
import css from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // const handleLoadMore = () => {
  //   if (currentPage < totalPages) {
  //     onPageChange(currentPage + 1);
  //   }
  // };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={css.pagination}>
      {/* Кнопки для кожної сторінки */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`${css.pageButton} ${currentPage === index + 1 ? css.activePage : ''}`}
          onClick={() => handlePageClick(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <div className={css.pageInfo}>
        Page {currentPage} of {totalPages}
      </div>

      {/* Кнопка Load More */}
      {/* {currentPage < totalPages && (
        <button className={css.pageButton} onClick={handleLoadMore}>
          Load More
        </button>
      )} */}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
