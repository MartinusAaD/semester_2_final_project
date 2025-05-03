import { signOut } from "firebase/auth";
import styles from "./MyProfile.module.css";
import { auth } from "../../firestoreConfig";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
