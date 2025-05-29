import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={styles.pageNotFoundWrapper}>
      <div className={styles.pageNotFoundContainer}>
        <h1>The page you are trying to reach does not exist</h1>
      </div>
    </div>
  );
};

export default PageNotFound;
