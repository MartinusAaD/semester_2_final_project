import styles from "./NavbarProductInfo.module.css";
import { NavLink } from "react-router-dom";

const NavbarProductInfo = () => {
  const setActiveClass = ({ isActive }) => (isActive ? styles.active : "");

  const scrollToTop = () => {
    // Smooth or not?
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <NavLink to="trees" className={setActiveClass} onClick={scrollToTop}>
          Trees
        </NavLink>
        <NavLink
          to="fruit-trees"
          className={setActiveClass}
          onClick={scrollToTop}
        >
          Fruit Trees
        </NavLink>
        <NavLink
          to="berry-bushes"
          className={setActiveClass}
          onClick={scrollToTop}
        >
          Berry Bushes
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarProductInfo;
