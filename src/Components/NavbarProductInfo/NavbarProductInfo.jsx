import styles from "./NavbarProductInfo.module.css";
import { NavLink } from "react-router-dom";

const NavbarProductInfo = () => {
  const setActiveClass = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <NavLink to="trees" className={setActiveClass}>
          Trees
        </NavLink>
        <NavLink to="fruit-trees" className={setActiveClass}>
          Fruit Trees
        </NavLink>
        <NavLink to="berry-bushes" className={setActiveClass}>
          Berry Bushes
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarProductInfo;
