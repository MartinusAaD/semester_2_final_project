import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { auth } from "../../firestoreConfig";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? styles.active : "");

  // Checks if there is a user logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbar__brandLogoContainer}>
          <NavLink to="/" className={styles.navbar__brandLogoLink}>
            <img
              src="/icons/treeIcon-white.png"
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

          {!isLoggedIn && (
            <NavLink to="/sign-in" className={styles.navbar__linksButton}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink to="/my-profile" className={styles.navbar__linksButton}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
