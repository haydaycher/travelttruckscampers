import css from './NoResultsMessage.module.css';

const NoResultsMessage = ({ filters, onResetFilters, errorMessage }) => {
  return (
    <div className={css.noResults}>
      {errorMessage ? (
        <>
          <h2 className={css.noResultsTitle}>❌ Упс! Щось пішло не так</h2>
          <p className={css.messageText}>{errorMessage}</p>
          {/* Додаємо підказки навіть при помилці */}
          <p className={css.instructions}>
            <strong>Поради для пошуку:</strong>
            <br />
            • Перевірте, чи правильно введена назва локації (наприклад, "Kyiv",
            "Lviv").
            <br />
            • Обирайте 1-2 основних типи кемперів для кращого результату.
            <br />
            • Вказуйте лише те обладнання, яке точно може бути присутнім.
            <br />• Якщо сумніваєтеся, спробуйте скинути фільтри.
          </p>
          <button
            className={css.resetButton}
            onClick={() => window.location.reload()}
          >
            🔄 Оновити сторінку
          </button>
        </>
      ) : (
        <>
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
          <p className={css.instructions}>
            <strong>Поради для пошуку:</strong>
            <br />
            • Переконайтеся, що назва локації введена правильно (наприклад,
            "Kyiv", "Lviv").
            <br />
            • Обирайте 1-2 основних типи кемперів для кращого результату.
            <br />
            • Вказуйте лише те обладнання, яке точно може бути присутнім.
            <br />• Якщо сумніваєтеся, спробуйте скинути фільтри, щоб побачити
            всі доступні варіанти.
          </p>
          <button className={css.resetButton} onClick={onResetFilters}>
            🔄 Скинути фільтри
          </button>
        </>
      )}
    </div>
  );
};

export default NoResultsMessage;
