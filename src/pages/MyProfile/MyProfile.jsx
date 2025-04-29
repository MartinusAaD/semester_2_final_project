import { signOut } from "firebase/auth";
import styles from "./MyProfile.module.css";
import { auth } from "../../firestoreConfig";

const Profile = () => {
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
