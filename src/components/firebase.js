// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8S2fi6YVN4vzw7lOTOYuJK5_G4K2aBFc",
  authDomain: "chatapp-a9a18.firebaseapp.com",
  databaseURL: "https://chatapp-a9a18-default-rtdb.firebaseio.com",
  projectId: "chatapp-a9a18",
  storageBucket: "chatapp-a9a18.appspot.com",
  messagingSenderId: "540917503246",
  appId: "1:540917503246:web:b43e8ecb881119a1afb35f",
  measurementId: "G-DTMP7XD7EP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
