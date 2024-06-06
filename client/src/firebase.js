// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-bff46.firebaseapp.com",
  projectId: "mern-estate-bff46",
  storageBucket: "mern-estate-bff46.appspot.com",
  messagingSenderId: "86239709797",
  appId: "1:86239709797:web:caf60027423ea92ef8d48c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);