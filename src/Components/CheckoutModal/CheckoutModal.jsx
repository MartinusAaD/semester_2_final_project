import styles from "./CheckoutModal.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const CheckoutModal = ({ setShowCheckoutModal }) => {
  return (
    <div className={styles.CheckoutModalWrapper}>
      <div className={styles.CheckoutModalContainer}>
        <Button
          className={styles.cancelButton}
          onClick={() => setShowCheckoutModal(false)}
        >
          <FontAwesomeIcon icon={faX} />
        </Button>
        <p className={styles.paragraph}>
          Sign in or sign up to create an account to keep all your orders in one
          place!
        </p>
        <div className={styles.linksButtonContainer}>
          <Link
            to="/sign-in"
            className={styles.linkButton}
            onClick={() => setShowCheckoutModal(false)}
          >
            Sign In!
          </Link>
          <Link
            to="/sign-up"
            className={styles.linkButton}
            onClick={() => setShowCheckoutModal(false)}
          >
            Sign Up!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
