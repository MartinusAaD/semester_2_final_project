import { useState } from "react";

export const useCheckoutValidation = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const firstLastnameRegex = /^[A-Za-zÆØÅæøåäöüÄÖÜßéèêëàáâçñ\s'-]{1,50}$/;
  const phoneNumberRegex = /^\d{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addressRegex = /^[A-Za-zÆØÅæøå0-9\s\-,.]{1,100}$/;
  const postalCodeRegex = /^\d{4}$/;
  const cardNumberRegex = /^\d{16}$/;
  const cardCvcRegex = /^\d{3}$/;

  const validate = (values, validate) => {
    let newErrors = {};

    // First Name
    if (!values.firstname?.trim()) {
      newErrors.firstname = "First name is required";
    } else if (!firstLastnameRegex.test(values.firstname)) {
      newErrors.firstname = "First name does not accept numbers or symbols";
    }

    // Last Name
    if (!values.lastname?.trim()) {
      newErrors.lastname = "Last name is required";
    } else if (!firstLastnameRegex.test(values.lastname)) {
      newErrors.lastname = "Last name does not accept numbers or symbols";
    }

    // Email
    if (!values.email?.trim()) {
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid email address!";
    }

    // Phone Number
    if (!values.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required!";
    } else if (!phoneNumberRegex.test(values.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number can not include letters!";
    } else if (values.phoneNumber?.trim().length !== 8) {
      newErrors.phoneNumber = "Phone Number must be 8 digits!";
    }

    // Address
    if (!values.address?.trim()) {
      newErrors.address = "Address is required";
    } else if (!addressRegex.test(values.address)) {
      newErrors.address = "Address can not include symbols";
    }

    // Postal Code
    if (!values.postalCode?.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!postalCodeRegex.test(values.postalCode)) {
      newErrors.postalCode = "Enter a valid postal code";
    }

    // ---------------- Shipping ---------------------------

    if (validate) {
      // First Name
      if (!values.shippingFirstname?.trim()) {
        newErrors.shippingFirstname = "First name is required";
      } else if (!firstLastnameRegex.test(values.shippingFirstname)) {
        newErrors.shippingFirstname =
          "First name does not accept numbers or symbols";
      }

      // Last Name
      if (!values.shippingLastname?.trim()) {
        newErrors.shippingLastname = "Last name is required";
      } else if (!firstLastnameRegex.test(values.shippingLastname)) {
        newErrors.shippingLastname =
          "Last name does not accept numbers or symbols";
      }

      // Email
      if (!values.shippingEmail?.trim()) {
        newErrors.shippingEmail = "Email is required!";
      } else if (!emailRegex.test(values.shippingEmail)) {
        newErrors.shippingEmail = "Please enter a valid email address!";
      }

      // Phone Number
      if (!values.shippingPhoneNumber) {
        newErrors.shippingPhoneNumber = "Phone Number is required!";
      } else if (!phoneNumberRegex.test(values.shippingPhoneNumber)) {
        newErrors.shippingPhoneNumber = "Phone Number can not include letters!";
      } else if (values.shippingPhoneNumber?.trim().length !== 8) {
        newErrors.shippingPhoneNumber = "Phone Number must be 8 digits!";
      }

      // Address
      if (!values.shippingAddress?.trim()) {
        newErrors.shippingAddress = "Address is required";
      } else if (!addressRegex.test(values.shippingAddress)) {
        newErrors.shippingAddress = "Address can not include symbols";
      }

      // Postal Code
      if (!values.shippingPostalCode?.trim()) {
        newErrors.shippingPostalCode = "Postal code is required";
      } else if (!postalCodeRegex.test(values.shippingPostalCode)) {
        newErrors.shippingPostalCode = "Enter a valid postal code";
      }
    }

    // ------------------------------------------------------

    // Name of Card holder
    if (!values.cardName?.trim()) {
      newErrors.cardName = "Name of Card Holder is required!";
    }

    // Card Number
    if (!values.cardNumber?.trim()) {
      newErrors.cardNumber = "Card Number is required!";
    } else if (!cardNumberRegex.test(values.cardNumber)) {
      newErrors.CardNumber = "Card number must be 16 digits, numbers only";
    }

    // Expiry Date
    // Month
    if (!values.cardExpiryMonth?.trim()) {
      newErrors.cardExpiryMonth = "Expiry date month is required";
    }

    // Year
    if (!values.cardExpiryYear?.trim()) {
      newErrors.cardExpiryYear = "Expiry date year is required";
    }

    // Cvc
    if (!values.cardCvc?.trim()) {
      newErrors.cardCvc = "Cvc is required!";
    } else if (!cardCvcRegex.test(values.cardCvc)) {
      newErrors.CardCvc = "Card cvc must be 3 digits, numbers only";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors);
  };

  return { validationErrors, setValidationErrors, validate };
};
