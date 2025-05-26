import { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firestoreConfig";
import { sendEmailVerification } from "firebase/auth";
import Button from "../../Components/Button/Button";
import { getAuthContext } from "../../context/authContext";

const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const { user, loading } = getAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    const checkVerificationStatus = async () => {
      await auth.currentUser.reload();
      setEmailVerified(auth.currentUser.emailVerified);

      if (auth.currentUser.emailVerified) {
        navigate("/my-profile");
      }
    };
    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleResendVerification = async () => {
    setFeedbackMessage("");

    try {
      if (loading) {
        return;
      }
      await sendEmailVerification(auth.currentUser);
      setFeedbackMessage(
        "A new verification email has been sent, please check your inbox!"
      );
    } catch (error) {
      setFeedbackMessage(
        `Error re-sending verification email! Please try again later. ${error.message}`
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

            {feedbackMessage && (
              <p className={styles.feedbackMessage}>{feedbackMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
