// NoResultsMessage.jsx
import css from './NoResultsMessage.module.css';

const NoResultsMessage = ({ filters, onResetFilters }) => {
  return (
    <div className={css.noResults}>
      <h2 className={css.noResultsTitle}>🔍 Ой! Нічого не знайдено</h2>
      <p className={css.messageText}>
        Ми не змогли знайти кемпери за заданими критеріями:
      </p>
      <ul className={css.filtersList}>
        {filters.location && (
          <li>
            📍 Локація: <strong>{filters.location}</strong>
          </li>
        )}
        {filters.form && (
          <li>
            🚐 Тип кемпера: <strong>{filters.form}</strong>
          </li>
        )}
        {filters.amenities && filters.amenities.length > 0 && (
          <li>
            🛠 Обладнання: <strong>{filters.amenities.join(', ')}</strong>
          </li>
        )}
      </ul>
      <p>Спробуйте змінити критерії пошуку або скинути фільтри.</p>
      <button className={css.resetButton} onClick={onResetFilters}>
        🔄 Скинути фільтри
      </button>
    </div>
  );
};

export default NoResultsMessage;
