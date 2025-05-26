import React from "react";
import styles from "./SignUp.module.css";
import Form from "../../Components/Form/Form";

const signUpForm = [
  {
    label: "First Name: *",
    name: "firstname",
    inputType: "text",
    placeholder: "Enter your First Name",
    errorMessage: "Please enter your user First Name!",
    validate: true,
  },
  {
    label: "Last Name: *",
    name: "lastname",
    inputType: "text",
    placeholder: "Enter your Last Name",
    errorMessage: "Please enter your user Last Name!",
    validate: true,
  },
  {
    label: "Address: *",
    name: "address",
    inputType: "text",
    placeholder: "Enter your address",
    errorMessage: "Please enter your user address!",
    validate: true,
  },
  {
    label: "Postal Code: *",
    name: "postalCode",
    inputType: "number",
    placeholder: "Enter your postal code",
    errorMessage: "Please enter your user postal code!",
    validate: true,
  },
  {
    label: "Email: *",
    name: "email",
    inputType: "email",
    placeholder: "Enter your email",
    errorMessage: "Please enter your email!",
    validate: true,
  },
  {
    label: "Phone Number: *",
    name: "phoneNumber",
    inputType: "tel",
    placeholder: "Enter your phone number",
    errorMessage: "Please enter your phone number!",
    validate: true,
  },

  {
    label: "Password: *",
    name: "password",
    inputType: "password",
    placeholder: "Enter a password",
    errorMessage: "Please enter a password!",
    validate: true,
  },
  {
    label: "Confirm Password: *",
    name: "confirmPassword",
    inputType: "password",
    placeholder: "Confirm your password",
    errorMessage: "Please confirm your password!",
    validate: true,
  },
  {
    label: "I accept the Terms & Conditions *",
    name: "terms",
    inputType: "checkbox",
    placeholder: false,
    errorMessage: "Must be checked to continue",
    validate: true,
  },
];

const SignUp = () => {
  return (
    <>
      <div className={styles.formRootContainer}>
        <div className={styles.formContainer}>
          <h1>Sign Up</h1>
          <Form
            sections={signUpForm}
            submitButtonText={"Sign Up"}
            typeOfForm={"signUp"}
            legendText={"User Information"}
            buttonStyle={styles.submitButton}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
