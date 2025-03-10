import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, disabled }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className={css.buttonLoadMore}
        disabled={disabled}
        aria-label="Load more items"
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
