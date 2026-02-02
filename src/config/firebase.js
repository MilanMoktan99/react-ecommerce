// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-900e2.firebaseapp.com",
  projectId: "e-commerce-900e2",
  storageBucket: "e-commerce-900e2.firebasestorage.app",
  messagingSenderId: "631043805545",
  appId: "1:631043805545:web:bbd26ddf6dff566a4f6df8",
  measurementId: "G-H8DTM2MYJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);