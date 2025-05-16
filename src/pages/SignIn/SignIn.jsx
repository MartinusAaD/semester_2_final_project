import React, { useState } from "react";
import Form from "../../Components/Form/Form";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firestoreConfig";

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
  const [showForgottenPasswordModal, setShowForgottenPasswordModal] =
    useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // Handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!resetEmail.trim()) {
      setResetMessage("Email is required to reset your password");
      return;
    } else if (!emailRegex.test(resetEmail)) {
      setResetMessage("Please enter a valid email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage(
        "If the account exists, you'll be receiving an email with further instructions on resetting your password"
      );
      setResetEmail("");
    } catch (error) {
      console.log(error.message);
      setResetMessage(
        "There was an error resetting your password, try again later"
      );
    }
  };
  return (
    <>
      <div className={styles.formRootContainer}>
        {!showForgottenPasswordModal && (
          <div className={styles.formContainer}>
            <h1>Sign In</h1>
            <Form
              sections={loginForm}
              submitButtonText={"Sign In"}
              typeOfForm={"signIn"}
              legendText={"User Information"}
              buttonStyle={styles.submitButton}
            />
            <p>
              Don't have an account? Register <Link to={"/sign-up"}>here</Link>
            </p>
            <p>
              Have you forgotten your password? Click{" "}
              <Button onClick={() => setShowForgottenPasswordModal(true)}>
                here
              </Button>
            </p>
          </div>
        )}
        {showForgottenPasswordModal && (
          <form className={styles.forgottenPasswordModalFormContainer}>
            <fieldset>
              <legend>Password Reset</legend>
              <p>
                Enter your email address and click "Reset Password" to receive
                an email with further instructions on how to reset your
                password.
              </p>
              <label htmlFor="resetEmail">Reset Email: </label>
              <input
                type="email"
                name="resetEmail"
                id="resetEmail"
                className={styles.formInput}
                placeholder="Enter your email"
                onChange={(e) => setResetEmail(e.target.value)}
                value={resetEmail}
              />
              <div className={styles.forgottenPasswordButtons}>
                <Button type={"submit"} onClick={handlePasswordReset}>
                  Reset Password
                </Button>
                <Button
                  type={"button"}
                  onClick={() => {
                    setShowForgottenPasswordModal(false);
                    setResetMessage("");
                    setResetEmail("");
                  }}
                >
                  Cancel
                </Button>
              </div>
              <p>{resetMessage}</p>
            </fieldset>
          </form>
        )}
      </div>
    </>
  );
};

export default SignIn;
