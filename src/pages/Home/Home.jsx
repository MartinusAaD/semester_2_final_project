import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      <div className={styles.homeContainer}>
        <h1 className={styles.header}>Welcome to The Fruiting Forest!</h1>
        <p className={styles.description}>Check out the links above!</p>
      </div>
    </div>
  );
};

export default Home;
