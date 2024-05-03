import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";
import AuthStatus from "./AuthStatus";
import Logo from "./Logo";

const Hero = ({ layers, globals }) => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.title}>
          {/* <h1>Petals</h1> */}
          <Logo layers={layers} globals={globals} />
        </Link>

        <AuthStatus />
      </div>
    </div>
  );
};

Hero.propTypes = {
  layers: PropTypes.array,
  globals: PropTypes.object,
};

export default Hero;
