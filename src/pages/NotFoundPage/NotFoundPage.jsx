import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.errorWrap}>
      <h1 className={css.errorPage}>Page Not Found</h1>
      <p className={css.errorText}>Ooops...error</p>
      <Link to="/" className={css.homeLink}>
        Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
