import { useDispatch } from "react-redux";
import { changeFilter } from "../redux/filters/filters.slice";

const FilterComponent = () => {
  const dispatch = useDispatch();

  const handleFilterChange = () => {
    dispatch(
      changeFilter({
        location: "New York",
        features: ["air-conditioning"],
        form: "van",
      })
    );
  };

  return (
    <div>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default FilterComponent;
