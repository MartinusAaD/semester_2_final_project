import { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firestoreConfig";
import { sendEmailVerification } from "firebase/auth";
import Button from "../../Components/Button/Button";

const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { errors, setErrors } = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      await auth.currentUser.reload();
      setEmailVerified(auth.currentUser.emailVerified);

      if (auth.currentUser.emailVerified) {
        navigate("/");
      }
    };
    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResendVerification = async () => {
    setErrors(null);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailSent(true);
    } catch (error) {
      setErrors(
        "Error re-sending verification email! Please try again later.",
        error.message
      );
    }
  };

  return (
    <div className={styles.verifyWrapper}>
      <div className={styles.verifyContainer}>
        {emailVerified ? (
          <h1>Email has been verified! Redirecting to the main page...</h1>
        ) : (
          <div className={styles.verificationContainer}>
            <h2>Check your inbox and verify your email!</h2>
            <h3>
              After verifying, you'll be automatically redirected to a different
              page.
            </h3>
            <p>
              If you haven't received the email, click the link below to request
              a new verification email.
            </p>
            <Button
              className={styles.resendButton}
              onClick={handleResendVerification}
            >
              Resend verification email
            </Button>

            {emailSent && (
              <p className={styles.successMessage}>
                A new verification email has been sent, please check your inbox!
              </p>
            )}
            {errors && <p className={styles.errorMessage}>{errors}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
