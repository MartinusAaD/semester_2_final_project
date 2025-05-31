import { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import { getAuthContext } from "../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firestoreConfig";
import { useCheckoutValidation } from "../../hooks/useCheckoutValidation";

const Checkout = () => {
  const [showShippingInformation, setShowShippingInformation] = useState(true);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    postalCode: "",
    email: "",
    phoneNumber: "",
    shippingFirstname: "",
    shippingLastname: "",
    shippingAddress: "",
    shippingPostalCode: "",
    shippingEmail: "",
    shippingPhoneNumber: "",
    cardName: "",
    cardNumber: "",
    cardExpiryMonth: "",
    cardExpiryYear: "",
    cardCvc: "",
  });

  const { user } = getAuthContext();
  const { validationErrors, setValidationErrors, validate } =
    useCheckoutValidation();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData((prev) => ({
            ...prev,
            firstname: userData.firstname,
            lastname: userData.lastname,
            address: userData.address,
            postalCode: userData.postalCode,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          }));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, [user]);

  const expiryDates = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      const year = currentYear + i;
      years.push(year.toString());
    }
    return years;
  };

  const expiryDateYears = expiryDates();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate(formData).length > 0) {
      console.log("Form is not valid!");
      return;
    }
  };

  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.checkoutContainer}>
        <h1>Checkout</h1>
        <form
          className={styles.checkoutForm}
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className={styles.formFieldset}>
            <legend className={styles.formLegend}>Personal Information</legend>
            <div className={styles.groupContainer}>
              <label htmlFor="firstname" title="Enter your First name">
                First Name: *
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter your First name"
                title="Enter your First name"
                onChange={handleChange}
                value={formData.firstname}
              />
              <p className={styles.errorMessage}>
                {validationErrors.firstname}
              </p>
            </div>

            <div className={styles.groupContainer}>
              <label htmlFor="lastname" title="Enter your Last name">
                Last Name: *
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter your Last name"
                title="Enter your Last name"
                onChange={handleChange}
                value={formData.lastname}
              />
              <p className={styles.errorMessage}>{validationErrors.lastname}</p>
            </div>

            <div className={styles.groupContainer}>
              <label htmlFor="address" title="Enter your Address">
                Address: *
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter your Address"
                title="Enter your Address"
                onChange={handleChange}
                value={formData.address}
              />
              <p className={styles.errorMessage}>{validationErrors.address}</p>
            </div>

            <div className={styles.groupContainer}>
              <label htmlFor="postalCode" title="Enter your Postal Code">
                Postal Code: *
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                placeholder="Enter your Postal Code"
                title="Enter your Postal Code"
                onChange={handleChange}
                value={formData.postalCode}
              />
              <p className={styles.errorMessage}>
                {validationErrors.postalCode}
              </p>
            </div>

            <div className={styles.groupContainer}>
              <label htmlFor="email" title="Enter your email">
                Email: *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                title="Enter your email"
                onChange={handleChange}
                value={formData.email}
              />
              <p className={styles.errorMessage}>{validationErrors.email}</p>
            </div>

            <div className={styles.groupContainer}>
              <label htmlFor="phoneNumber" title="Enter your Phone Number">
                Phone Number: *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your Phone Number"
                title="Enter your Phone Number"
                onChange={handleChange}
                value={formData.phoneNumber}
              />
              <p className={styles.errorMessage}>
                {validationErrors.phoneNumber}
              </p>
            </div>
          </fieldset>

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              onChange={(e) => setShowShippingInformation(!e.target.checked)}
            />
            <label htmlFor="checkbox">
              Check if shipping is same as above.
            </label>
          </div>

          {/* Shipping Information */}
          {showShippingInformation && (
            <fieldset className={styles.formFieldset}>
              <legend className={styles.formLegend}>
                Shipping Information
              </legend>
              <div className={styles.groupContainer}>
                <label
                  htmlFor="shippingFirstname"
                  title="Enter your First name"
                >
                  First Name: *
                </label>
                <input
                  type="text"
                  name="shippingFirstname"
                  id="shippingFirstname"
                  placeholder="Enter your First name"
                  title="Enter your First name"
                  onChange={handleChange}
                  value={formData.shippingFirstname}
                />
                <p className={styles.errorMessage}>
                  {validationErrors.shippingFirstname}
                </p>
              </div>

              <div className={styles.groupContainer}>
                <label htmlFor="shippingLastname" title="Enter your Last name">
                  Last Name: *
                </label>
                <input
                  type="text"
                  name="shippingLastname"
                  id="shippingLastname"
                  placeholder="Enter your Last name"
                  title="Enter your Last name"
                  onChange={handleChange}
                  value={formData.shippingLastname}
                />
                <p className={styles.errorMessage}>
                  {validationErrors.shippingLastname}
                </p>
              </div>

              <div className={styles.groupContainer}>
                <label htmlFor="shippingAddress" title="Enter your Address">
                  Address: *
                </label>
                <input
                  type="text"
                  name="shippingAddress"
                  id="shippingAddress"
                  placeholder="Enter your Address"
                  title="Enter your Address"
                  onChange={handleChange}
                  value={formData.shippingAddress}
                />
                <p className={styles.errorMessage}>
                  {validationErrors.shippingAddress}
                </p>
              </div>

              <div className={styles.groupContainer}>
                <label
                  htmlFor="shippingPostalCode"
                  title="Enter your Postal Code"
                >
                  Postal Code: *
                </label>
                <input
                  type="text"
                  name="shippingPostalCode"
                  id="shippingPostalCode"
                  placeholder="Enter your Postal Code"
                  title="Enter your Postal Code"
                  onChange={handleChange}
                  value={formData.shippingPostalCode}
                />
                <p className={styles.errorMessage}>
                  {validationErrors.shippingPostalCode}
                </p>
              </div>

              <div className={styles.groupContainer}>
                <label htmlFor="shippingEmail" title="Enter your email">
                  Email: *
                </label>
                <input
                  type="email"
                  name="shippingEmail"
                  id="shippingEmail"
                  placeholder="Enter your email"
                  title="Enter your email"
                  onChange={handleChange}
                  value={formData.shippingEmail}
                />
                <p className={styles.errorMessage}>
                  {validationErrors.shippingEmail}
                </p>
              </div>

              <div className={styles.groupContainer}>
                <label
                  htmlFor="shippingPhoneNumber"
                  title="Enter your Phone Number"
                >
                  Phone Number: *
                </label>
                <input
                  type="tel"
                  name="shippingPhoneNumber"
                  id="shippingPhoneNumber"
                  placeholder="Enter your ShippingPhone Number"
                  title="Enter your ShippingPhone Number"
                  onChange={handleChange}
                  value={formData.shippingPhoneNumber}
                />
                <p className={styles.errorMessage}>
                  {validationErrors.shippingPhoneNumber}
                </p>
              </div>
            </fieldset>
          )}

          <fieldset className={styles.formFieldset}>
            <legend className={styles.formLegend}>Payment Information</legend>

            <div className={styles.groupContainer}>
              <label htmlFor="cardName" title="Enter the full name on the card">
                Name on Card: *
              </label>
              <input
                type="text"
                name="cardName"
                id="cardName"
                placeholder="John Doe"
                title="Enter the full name on the card"
                onChange={handleChange}
                value={formData.cardName}
              />
              <p className={styles.errorMessage}>{validationErrors.cardName}</p>
            </div>

            <div className={styles.groupContainer}>
              <label htmlFor="cardNumber" title="Enter the number on your card">
                Card Number: *
              </label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                title="Enter the number on your card"
                onChange={handleChange}
                value={formData.cardNumber}
              />
              <p className={styles.errorMessage}>
                {validationErrors.cardNumber}
              </p>
            </div>

            <div className={styles.groupContainer}>
              <label htmlFor="expiryDate">Expiry Date: *</label>
              <div className={styles.expiryDateContainer}>
                <select
                  name="cardExpiryMonth"
                  id="cardExpiryMonth"
                  onChange={handleChange}
                >
                  <option value="">MM</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <p>/</p>
                <select
                  name="cardExpiryYear"
                  id="cardExpiryYear"
                  onChange={handleChange}
                >
                  <option value="">YYYY</option>
                  {expiryDateYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.errorMessageGroup}>
                <p className={styles.errorMessage}>
                  {validationErrors.cardExpiryMonth}
                </p>

                {validationErrors.cardExpiryMonth &&
                  validationErrors.cardExpiryYear && (
                    <p className={styles.errorMessage}>/</p>
                  )}

                <p className={styles.errorMessage}>
                  {validationErrors.cardExpiryYear}
                </p>
              </div>
            </div>

            <div className={styles.groupContainer}>
              <label htmlFor="cvc" title="Enter your cards cvc number">
                CVC: *
              </label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                placeholder="000"
                title="Enter your cards cvc number"
                onChange={handleChange}
                value={formData.cardCvc}
              />
            </div>
            <p className={styles.errorMessage}>{validationErrors.cardCvc}</p>
          </fieldset>

          <p className={styles.feedbackMessage}></p>

          <div className={styles.buttonsContainer}>
            <Button className={styles.buttonLink}>Order</Button>
            <Link to="/cart" className={styles.buttonLink}>
              Cancel Order
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
