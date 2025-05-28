import { useState } from "react";

export const useMyProfileValidation = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const firstLastnameRegex = /^[A-Za-zÆØÅæøåäöüÄÖÜßéèêëàáâçñ\s'-]{1,50}$/;
  const phoneNumberRegex = /^\d{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addressRegex = /^[A-Za-zÆØÅæøå0-9\s\-,.]{1,100}$/;
  const postalCodeRegex = /^\d{4}$/;

  const validate = (values) => {
    let newErrors = {};

    // First Name
    if (!values.firstname.trim()) {
      newErrors.firstname = "First name is required";
    } else if (!firstLastnameRegex.test(values.firstname)) {
      newErrors.firstname = "First name does not accept numbers or symbols";
    }

    // Last Name
    if (!values.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    } else if (!firstLastnameRegex.test(values.lastname)) {
      newErrors.lastname = "Last name does not accept numbers or symbols";
    }

    // Email
    if (!values.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid email address!";
    }

    // Phone Number
    if (!values.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required!";
    } else if (!phoneNumberRegex.test(values.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number can not include letters!";
    } else if (values.phoneNumber.trim().length !== 8) {
      newErrors.phoneNumber = "Phone Number must be 8 digits!";
    }

    // Address
    if (!values.address.trim()) {
      newErrors.address = "Address is required";
    } else if (!addressRegex.test(values.address)) {
      newErrors.address = "Address can not include symbols";
    }

    // Postal Code
    if (!values.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!postalCodeRegex.test(values.postalCode)) {
      newErrors.postalCode = "Enter a valid postal code";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors);
  };

  return { validationErrors, setValidationErrors, validate };
};
