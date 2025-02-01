import css from "./Logo.module.css";
import { Link } from "react-router-dom";
import {
  LOGO_WIDTH,
  LOGO_HEIGHT,
  LOGO_SPRITE_ID,
} from "../../constants/logoConstants.js";

const Logo = () => {
  return (
    <Link to="/" className={css.logo}>
      <svg width={LOGO_WIDTH} height={LOGO_HEIGHT}>
        <use href={`/icons-svg.svg#${LOGO_SPRITE_ID}`} />
      </svg>
    </Link>
  );
};

export default Logo;
