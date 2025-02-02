import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFilteredCampers } from "../../redux/campers/campers.selectors";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from "./CampersList.module.css";

const CampersList = () => {
  const campers = useSelector(selectFilteredCampers);
  const [visibleItems, setVisibleItems] = useState(5);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 5);
  };

  return (
    <div className={css.listContainer}>
      {campers.length > 0 ? (
        <>
          <ul className={css.list}>
            {campers.slice(0, visibleItems).map((camper) => (
              <li key={camper.id} className={css.item}>
                <h3>{camper.name}</h3>
                <p>Price: {camper.price.toFixed(2)}</p>{" "}
                {/* Форматування ціни */}
                <Link to={`/catalog/${camper.id}`} className={css.detailsLink}>
                  View Details
                </Link>
              </li>
            ))}
          </ul>
          {campers.length > visibleItems && <LoadMoreBtn onClick={loadMore} />}
        </>
      ) : (
        <p>No campers match the selected filters.</p>
      )}
      {/* if (status === 'loading') return <Loader />; */}
    </div>
  );
};

export default CampersList;
