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
        <div className={styles.navbar__iconContainer}>
          <img
            src="./icons/android-chrome-512x512.png"
            alt="image"
            className={styles.navbar__icon}
          />
        </div>
        <div className={`${styles.navbar__links} ${styles.navbar__linksFirst}`}>
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
        <div className={`${styles.navbar__links} ${styles.navbar__linksLast}`}>
          <NavLink to="/basket">
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
