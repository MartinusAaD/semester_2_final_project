import styles from "./Button.module.css";
const Button = ({ buttonText, onClickFunction }) => {
  return (
    <button className={styles.button} onClick={onClickFunction}>
      {buttonText}
    </button>
  );
};

export default Button;
