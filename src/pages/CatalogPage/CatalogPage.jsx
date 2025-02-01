import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { Link } from "react-router-dom";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Catalog</h1>
      <ul>
        {items.map((camper) => (
          <li key={camper.id}>
            <h3>{camper.name}</h3>
            <p>Price: ${camper.price}.00</p>
            <Link to={`/catalog/${camper.id}`}>
              <button>Show more</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogPage;
