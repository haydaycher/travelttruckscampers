import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.home_container}>
        <h1 className={css.home_title}>Campers of your dreams</h1>
        <p className={css.home_moto}>
          You can find everything you want in our catalog
        </p>
        <Link to="/catalog">
          <button className={css.home_main_btn}>View Now</button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
