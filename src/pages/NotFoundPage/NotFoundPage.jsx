import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.errorWrap}>
      <h1 className={css.errorPage}>Page Not Found</h1>
      <p className={css.errorText}>Немає результатів за заданими критеріями.</p>

      <Link to="/">
        <button className={css.homeLink}>Back Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
