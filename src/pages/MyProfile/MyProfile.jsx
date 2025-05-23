import { signOut } from "firebase/auth";
import styles from "./MyProfile.module.css";
import { auth } from "../../firestoreConfig";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

const Profile = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div className={styles.myProfileWrapper}>
      <Button onClick={handleSignOut}>Sign Out</Button>
    
    </div>
  );
};

export default Profile;
