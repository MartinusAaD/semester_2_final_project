import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlwSPUPE7MMxPHzpXHXus3WJPIyaCG6TU",
  authDomain: "the-fruiting-forest.firebaseapp.com",
  projectId: "the-fruiting-forest",
  storageBucket: "the-fruiting-forest.firebasestorage.app",
  messagingSenderId: "936443657472",
  appId: "1:936443657472:web:2477306237219c4f00c7e5",
  measurementId: "G-QT9Q0QXT25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
