import { signOut, updateProfile } from "firebase/auth";
import styles from "./MyProfile.module.css";
import { auth, database } from "../../firestoreConfig";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthContext } from "../../context/authContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Button/Button";
import { useMyProfileValidation } from "../../hooks/useMyProfileValidation";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [tempUserData, setTempUserData] = useState(null);
  const [userErrorMessage, setUserErrorMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = getAuthContext();

  const { validationErrors, setValidationErrors, validate } =
    useMyProfileValidation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserErrorMessage("");
          setUserData(userDoc.data());
        } else {
          setUserErrorMessage(
            "The profile could not be retrieved, try again later..."
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserData();
  }, [user]);

  const location = useLocation();
  console.log(location);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const changeToEdit = () => {
    setIsInEditMode(true);
    setIsDisabled(false);
    setTempUserData(userData);
    setFeedbackMessage("Edit mode activated");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const cancelEditMode = () => {
    setIsInEditMode(false);
    setIsDisabled(true);
    setUserData(tempUserData);
    setTempUserData(null);
    setValidationErrors({});
    setFeedbackMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate(userData).length > 0) {
      console.log("Form is not valid!");
      return;
    }

    try {
      const userDocRef = doc(database, "users", user.uid);

      // Update Firebase Doc
      await updateDoc(userDocRef, {
        firstname: userData.firstname,
        lastname: userData.lastname,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        postalCode: userData.postalCode,
      });

      // Update Firebase Auth (found through research)
      await updateProfile(auth.currentUser, {
        displayName: `${userData.firstname} ${userData.lastname}`,
      });

      setIsInEditMode(false);
      setIsDisabled(true);

      console.log("User updated successfully!");
      setFeedbackMessage("User has been updated successfully!");
    } catch (error) {
      console.log("Failed to update user:", error.message);
      setFeedbackMessage("There was en error updating your user.");
    }
  };

  return (
    <div className={styles.myProfileWrapper}>
      <div className={styles.myProfileContainer}>
        <nav className={styles.myProfileNavbar}>
          <NavLink
            to="/my-profile"
            end //end suggested by chatGPT to fix underline active styling
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            My Profile
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Orders
          </NavLink>
          <NavLink to="/sign-in" onClick={handleSignOut}>
            Sign Out
          </NavLink>
        </nav>

        {userErrorMessage && <h1>{userErrorMessage}</h1>}

        {location.pathname === "/my-profile" && (
          <form
            className={styles.myProfileContainerInner}
            noValidate
            onSubmit={handleSubmit}
          >
            <div className={styles.profileImageContainer}>
              {userData?.profilePicture ? (
                <div className={styles.imageContainer}>
                  <img
                    src={userData?.profilePicture}
                    alt="Users profile picture"
                    className={styles.profilePicture}
                    //onError code by ChatGpt
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = "/images/image-not-found.jpg";
                      e.target.alt = `Fallback image of users profile picture`;
                    }}
                  />
                </div>
              ) : (
                <div className={styles.IconContainer}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className={styles.profileIcon}
                  />
                </div>
              )}
            </div>
            <div className={styles.profileDetailsListContainer}>
              <div className={styles.profileDetailsList}>
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="firstname"
                    title="First name can consists only of letters and spaces. Max 50 characters"
                  >
                    First Name: *
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder=""
                    disabled={isDisabled}
                    value={userData?.firstname}
                    onChange={handleChange}
                    title="First name can consists only of letters and spaces. Max 50 characters"
                  />
                  <p className={styles.validationErrorMessage}>
                    {validationErrors.firstname}
                  </p>
                </div>
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="lastname"
                    title="Last name can consists only of letters and spaces. Max 50 characters"
                  >
                    Last Name: *
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder=""
                    disabled={isDisabled}
                    value={userData?.lastname}
                    onChange={handleChange}
                    title="Last name can consists only of letters and spaces. Max 50 characters"
                  />
                  <p className={styles.validationErrorMessage}>
                    {validationErrors.lastname}
                  </p>
                </div>

                <div className={styles.inputContainer}>
                  <label
                    htmlFor="email"
                    title="Emails must use a similar format 'john.doe@email.com'"
                  >
                    Email: 
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder=""
                    disabled
                    value={userData?.email}
                    onChange={handleChange}
                    title="Emails must use a similar format 'john.doe@email.com'"
                  />
                  <p className={styles.validationErrorMessage}>
                    {validationErrors.email}
                  </p>
                </div>
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="phoneNumber"
                    title="Phone numbers consists only of numbers"
                  >
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder=""
                    disabled={isDisabled}
                    value={userData?.phoneNumber}
                    onChange={handleChange}
                    title="Phone numbers consists only of numbers"
                  />
                  <p className={styles.validationErrorMessage}>
                    {validationErrors.phoneNumber}
                  </p>
                </div>
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="address"
                    title="The address consists only of letters, numbers and spaces. No symbols or special characters allowed"
                  >
                    Address:
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder=""
                    disabled={isDisabled}
                    value={userData?.address}
                    onChange={handleChange}
                    title="The address consists only of letters, numbers and spaces. No symbols or special characters allowed"
                  />
                  <p className={styles.validationErrorMessage}>
                    {validationErrors.address}
                  </p>
                </div>
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="postalCode"
                    title='The postal code consists only of numbers. For example "0123"'
                  >
                    Postal code:
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    placeholder=""
                    disabled={isDisabled}
                    value={userData?.postalCode}
                    onChange={handleChange}
                    title="The postal code consists only of numbers. etc: '0123' "
                  />
                  <p className={styles.validationErrorMessage}>
                    {validationErrors.postalCode}
                  </p>
                </div>
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="emailVerificationStatus"
                    title="Shows the status of the accounts verification."
                  >
                    Email verification status:
                  </label>
                  <input
                    type="text"
                    name="emailVerificationStatus"
                    id="emailVerificationStatus"
                    disabled
                    value={
                      auth?.currentUser?.emailVerified
                        ? "Verified"
                        : "Not verified"
                    }
                    title="Shows the status of the accounts verification."
                  />
                  <p className={styles.validationErrorMessage}></p>
                  {/* Resend verification */}
                </div>
                <div className={styles.inputContainer}>
                  <label
                    htmlFor="memberSince"
                    title="Shows the date of when the account was created."
                  >
                    Member since:
                  </label>
                  <input
                    type="text"
                    name="memberSince"
                    id="memberSince"
                    disabled
                    value={
                      userData?.createdAt
                        ? new Date(
                            userData?.createdAt.toDate()
                          ).toLocaleDateString()
                        : "N/A"
                    }
                    title="Shows the date of when the account was created."
                  />
                </div>
              </div>
            </div>
            <div className={styles.feedbackMessageContainer}>
              <p className={styles.feedbackMessage}>{feedbackMessage}</p>
            </div>
            <div className={styles.buttonContainer}>
              {!isInEditMode && (
                <Button
                  className={styles.editButton}
                  onClick={changeToEdit}
                  type={"button"}
                >
                  Edit Profile
                </Button>
              )}

              {isInEditMode && (
                <>
                  <Button className={styles.editButton}>Confirm</Button>
                  <Button
                    className={styles.editButton}
                    onClick={cancelEditMode}
                    type={"button"}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        )}

        {location.pathname === "/my-profile/orders" && (
          <div className={styles.ordersContainer}>Orders</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
