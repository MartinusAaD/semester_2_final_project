import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { auth } from "../../firestoreConfig";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";
import Button from "../Button/Button";

const Navbar = () => {
  const setActiveClass = ({ isActive }) => (isActive ? styles.active : "");
  const [showMenu, setShowMenu] = useState(false);

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
        <div className={styles.brandLogoContainer}>
          <NavLink to="/" className={styles.brandLogoLink}>
            <img
              src="/icons/treeIcon-white.png"
              alt="image"
              className={styles.icon}
            />
            <div className={styles.brandName}>
              <p className={styles.brandNameWord}>The</p>
              <p className={styles.brandNameWord}>Fruiting</p>
              <p className={styles.brandNameWord}>Forest</p>
            </div>
          </NavLink>
        </div>
        <div
          className={`${styles.linksContainer} ${styles.linksTextContainer} ${
            showMenu ? styles.sidebarOpen : ""
          } `}
        >
          {showMenu && (
            <Button
              className={`${styles.menuExitButton}`}
              onClick={() => setShowMenu(false)}
            >
              <FontAwesomeIcon icon={faX} />
            </Button>
          )}
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

          {/* Displays on smaller screens */}
          {showMenu && (
            <>
              {!isLoggedIn && (
                <NavLink to="/sign-in" className={setActiveClass}>
                  Sign In
                </NavLink>
              )}

              {isLoggedIn && (
                <NavLink to="/my-profile" className={setActiveClass}>
                  My Profile
                </NavLink>
              )}
            </>
          )}
        </div>
        <div
          className={`${styles.linksContainer} ${styles.linksButtonsContainer} ${styles.biggerScreensContainer}`}
        >
          <NavLink to="/cart" className={styles.linksButton}>
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>

          {!isLoggedIn && (
            <NavLink to="/sign-in" className={styles.linksButton}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink to="/my-profile" className={styles.linksButton}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          )}
        </div>
        <div
          className={`${styles.linksContainer} ${styles.linksButtonsContainer} ${styles.smallerScreensContainer}`}
        >
          <NavLink to="/cart" className={styles.linksButton}>
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>

          <Button
            className={styles.linksButton}
            onClick={() => setShowMenu(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
