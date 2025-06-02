import React from "react";
import styles from "./OrderComplete.module.css";
import { Link } from "react-router-dom";

const OrderComplete = () => {
  return (
    <div className={styles.orderCompleteWrapper}>
      <div className={styles.orderCompleteContainer}>
        <h1 className={styles.header}>Your order has been received!</h1>
        <p className={styles.paragraph}>
          You will receive an email with your orders receipt.
        </p>
        <p className={styles.paragraph}>
          If you encounter any issues or need help with anything, don't hesitate
          in contacting us!
        </p>

        <Link to="/contact" className={styles.linkButton}>Contact Us!</Link>
      </div>
    </div>
  );
};

export default OrderComplete;
