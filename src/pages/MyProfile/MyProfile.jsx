import { signOut } from "firebase/auth";
import styles from "./MyProfile.module.css";
import { auth, database } from "../../firestoreConfig";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuthContext } from "../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = getAuthContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setErrorMessage("");
          setUserData(userDoc.data());
        } else {
          setErrorMessage(
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

        {errorMessage && <h1>{userData}</h1>}

        {location.pathname === "/my-profile" && (
          <div className={styles.myProfileContainerInner}>
            <div className={styles.profileImageContainer}>
              {userData?.profilePicture ? (
                <div className={styles.imageContainer}>
                  <img
                    src={userData?.profilePicture}
                    alt=""
                    className={styles.profilePicture}
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
              <ul className={styles.profileDetailsList}>
                <div className={styles.listElementContainer}>
                  <li>
                    <strong>First Name:</strong>
                  </li>
                  <li>{userData?.firstname}</li>
                </div>
                <div className={styles.listElementContainer}>
                  <li>
                    <strong>Last Name:</strong>
                  </li>
                  <li>{userData?.lastname}</li>
                </div>
                <div className={styles.listElementContainer}>
                  <li>
                    <strong>Email:</strong>
                  </li>
                  <li>{userData?.email}</li>
                </div>
                <div className={styles.listElementContainer}>
                  <li>
                    <strong>Phone Number:</strong>
                  </li>
                  <li>{userData?.phoneNumber}</li>
                </div>
                <div className={styles.listElementContainer}>
                  <li>
                    <strong>Address:</strong>
                  </li>
                  <li>{userData?.address}</li>
                </div>
                <div className={styles.listElementContainer}>
                  <li>
                    <strong>Postal code:</strong>
                  </li>
                  <li>{userData?.postalCode}</li>
                </div>
                <div className={styles.listElementContainer}>
                  <li>
                    <strong>Email verification status:</strong>
                  </li>
                  <li>
                    {auth?.currentUser?.emailVerified
                      ? "Verified"
                      : "Not verified"}
                  </li>
                </div>
                <div className={styles.listElementContainer}>
                  <li>
                    <strong>Member since:</strong>
                  </li>
                  <li>
                    {userData?.createdAt
                      ? new Date(
                          userData?.createdAt.toDate()
                        ).toLocaleDateString()
                      : "N/A"}
                  </li>
                </div>
              </ul>
            </div>
          </div>
        )}

        {location.pathname === "/my-profile/orders" && (
          <div className={styles.ordersContainer}>Orders</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
