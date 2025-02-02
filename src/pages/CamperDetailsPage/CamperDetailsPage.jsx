import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/operations";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper, status, error } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <NotFoundPage />;
  if (!selectedCamper) return <p>No data available</p>;

  return (
    <div>
      <h1>{selectedCamper.name}</h1>
      <p>Price: ${selectedCamper.price}.00</p>
      <p>Location: {selectedCamper.location}</p>
      <p>Transmission: {selectedCamper.transmission}</p>
      {/* Додай інші характеристики */}
    </div>
  );
};

export default CamperDetailsPage;
