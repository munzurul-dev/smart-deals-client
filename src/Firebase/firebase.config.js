// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApQwUhHe6HGwi921avdDvcaXhYyITz-vA",
  authDomain: "smart-deals-43f11.firebaseapp.com",
  projectId: "smart-deals-43f11",
  storageBucket: "smart-deals-43f11.firebasestorage.app",
  messagingSenderId: "464886448622",
  appId: "1:464886448622:web:2249025e5b1b0bffc08eff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;