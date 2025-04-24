import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbar__brandLogoContainer}>
          <NavLink to="/" className={styles.navbar__brandLogoLink}>
            <img
              src="./icons/treeIcon-white.png"
              alt="image"
              className={styles.navbar__icon}
            />
            <div className={styles.navbar__brandName}>
              <p className={styles.navbar__brandNameWord}>The</p>
              <p className={styles.navbar__brandNameWord}>Fruiting</p>
              <p className={styles.navbar__brandNameWord}>Forest</p>
            </div>
          </NavLink>
        </div>
        <div
          className={`${styles.navbar__linksContainer} ${styles.navbar__linksTextContainer}`}
        >
          <NavLink to="/" className={setActiveClass}>
            Home
          </NavLink>
          <NavLink to="/product-info" className={setActiveClass}>
            Info
          </NavLink>
          <NavLink to="/product-store" className={setActiveClass}>
            Store
          </NavLink>
          <NavLink to="/contact" className={setActiveClass}>
            Contact
          </NavLink>
        </div>
        <div
          className={`${styles.navbar__linksContainer} ${styles.navbar__linksButtonsContainer}`}
        >
          <NavLink to="/basket" className={styles.navbar__linksButton}>
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>
          <NavLink to="/profile" className={styles.navbar__linksButton}>
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
