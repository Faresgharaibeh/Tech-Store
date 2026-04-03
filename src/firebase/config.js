// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3OOe_-WHYfiKIm4xH04ClUnfTyLtlw9Q",
  authDomain: "tech-store-de852.firebaseapp.com",
  projectId: "tech-store-de852",
  storageBucket: "tech-store-de852.firebasestorage.app",
  messagingSenderId: "19461438319",
  appId: "1:19461438319:web:332ddedc573fe8f5d6469a",
  measurementId: "G-Z6099YLXWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);