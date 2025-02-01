import css from "./HeaderMenu.module.css";
import Navigation from "../Navigation/Navigation";
import Logo from "../Logo/Logo";
import { Outlet } from "react-router-dom";

const HeaderMenu = () => (
  <>
    <header className={css.header_menu}>
      <div className={css.logo}>
        <Logo />
      </div>
      <div className={css.nav_container}>
        <Navigation />
      </div>
    </header>

    <main>
      <Outlet />
    </main>
  </>
);

export default HeaderMenu;
