import React, { useState } from "react";
import styles from "./CurrencyConverter.module.css";

const CurrencyConverter = ({ setCurrencyType, selectStyles }) => {
  return (
    <div className={styles.CurrencyConverterWrapper}>
      <select
        name="currencyType"
        id="currencyType"
        className={selectStyles}
        onChange={(e) => setCurrencyType(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="NOK">NOK</option>
        <option value="SEK">SEK</option>
        <option value="DKK">DKK</option>
        <option value="JPY">JPY</option>
      </select>
    </div>
  );
};

export default CurrencyConverter;
