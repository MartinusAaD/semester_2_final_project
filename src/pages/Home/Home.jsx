import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeContainer}>
        <h1 className={styles.header}>Welcome to The Fruiting Forest!</h1>
        <p className={styles.description}>Check out the links above!</p>
        <Link to={"./product-store"} className={styles.toStoreButton}>
          To Store!
        </Link>
      </div>
    </div>
  );
};

export default Home;
