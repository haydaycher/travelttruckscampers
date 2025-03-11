import PropTypes from 'prop-types';
import css from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={css.pagination}>
      {/* Кнопка "Попередня сторінка" */}
      <button
        className={css.pageButton}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Кнопки для кожної сторінки */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`${css.pageButton} ${currentPage === index + 1 ? css.activePage : ''}`}
          onClick={() => handlePageClick(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}

      {/* Кнопка "Наступна сторінка" */}
      <button
        className={css.pageButton}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <div className={css.pageInfo}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
