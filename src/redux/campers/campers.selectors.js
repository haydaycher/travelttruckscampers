// Вибірка всіх кемперів
export const selectCampers = (state) => state.campers.items;

// Вибірка вибраного кемпера
export const selectSelectedCamper = (state) => state.campers.selectedCamper;

// Вибірка статусу завантаження
export const selectStatus = (state) => state.campers.status;

// Вибірка помилки
export const selectError = (state) => state.campers.error;

// Вибірка фільтрованих кемперів
export const selectFilteredCampers = (state) => {
  const campers = state.campers.items; // всі кемпери
  const filters = state.filters; // фільтри (наприклад, локація, характеристики)

  return campers.filter((camper) => {
    // Фільтрація за локацією
    const matchesLocation = filters.location ? camper.location === filters.location : true;

    // Фільтрація за характеристиками
    const matchesFeatures =
      filters.features.length === 0 || filters.features.every((feature) => camper.features.includes(feature));

    // Фільтрація за формою
    const matchesForm = filters.form ? camper.form === filters.form : true;

    // Повертаємо кемпер, якщо всі умови виконуються
    return matchesLocation && matchesFeatures && matchesForm;
  });
};
