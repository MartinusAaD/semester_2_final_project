import styles from "./NavbarProductInfo.module.css";
import { NavLink } from "react-router-dom";

const NavbarProductInfo = ({ setItemProperty }) => {
  const setActiveClass = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <NavLink
          to="trees"
          className={setActiveClass}
          onClick={() => setItemProperty("tree")}
        >
          Trees
        </NavLink>
        <NavLink
          to="fruit-trees"
          className={setActiveClass}
          onClick={() => setItemProperty("fruitTree")}
        >
          Fruit Trees
        </NavLink>
        <NavLink
          to="berry-bushes"
          className={setActiveClass}
          onClick={() => setItemProperty("bush")}
        >
          Berry Bushes
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarProductInfo;
