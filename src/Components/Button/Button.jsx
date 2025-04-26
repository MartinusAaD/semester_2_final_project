import styles from "./Button.module.css";
const Button = ({ buttonText, onClickFunction, style }) => {
  return (
    <button className={styles.button} onClick={onClickFunction} style={style}>
      {buttonText}
    </button>
  );
};

export default Button;
