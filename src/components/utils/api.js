

const filterCampers = (campers, { location, type, features }) => {
  let filteredCampers = campers;


  if (location) {
    filteredCampers = filteredCampers.filter((camper) =>
      camper.location.toLowerCase().includes(location.toLowerCase())
    );
  }


  if (type) {
    filteredCampers = filteredCampers.filter((camper) => camper.type === type);
  }

  
  if (features) {
    const selectedFeatures = features.split(","); 
    filteredCampers = filteredCampers.filter((camper) =>
      selectedFeatures.every((feature) => camper.features.includes(feature))
    );
  }

  return filteredCampers;
};

export default filterCampers;
