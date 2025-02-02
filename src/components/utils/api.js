// utils/

const filterCampers = (campers, { location, type, features }) => {
  let filteredCampers = campers;

  // Фільтрація за локацією
  if (location) {
    filteredCampers = filteredCampers.filter((camper) =>
      camper.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Фільтрація за типом
  if (type) {
    filteredCampers = filteredCampers.filter((camper) => camper.type === type);
  }

  // Фільтрація за наявністю характеристик
  if (features) {
    const selectedFeatures = features.split(","); // розділяємо за комою
    filteredCampers = filteredCampers.filter((camper) =>
      selectedFeatures.every((feature) => camper.features.includes(feature))
    );
  }

  return filteredCampers;
};

module.exports = filterCampers;
