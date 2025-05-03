import React from "react";
import Form from "../../Components/Form/Form";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";

const loginForm = [
  {
    label: "Email: *",
    name: "email",
    inputType: "email",
    placeholder: "Enter your user email",
    errorMessage: "Please enter your user email!",
    validate: true,
  },
  {
    label: "Password: *",
    name: "password",
    inputType: "password",
    placeholder: "Enter your user password",
    errorMessage: "Please enter your user password!",
    validate: true,
  },
];

const SignIn = () => {
  return (
    <>
      <div className={styles.formRootContainer}>
        <div className={styles.formContainer}>
          <h1>Sign In</h1>
          <Form
            sections={loginForm}
            submitButtonText={"Sign in"}
            typeOfForm={"signIn"}
          />
          <p>
            Don't have an account? Register <Link to={"/sign-up"}>here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
