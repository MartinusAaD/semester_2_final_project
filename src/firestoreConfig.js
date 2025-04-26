// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
