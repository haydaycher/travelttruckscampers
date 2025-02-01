import { useSelector } from "react-redux";
import { selectFilteredCampers } from "../redux/campers/campers.selectors";

const CampersList = () => {
  const filteredCampers = useSelector(selectFilteredCampers);

  return (
    <div>
      {filteredCampers.map((camper) => (
        <div key={camper.id}>{camper.name}</div>
      ))}
    </div>
  );
};

export default CampersList;
