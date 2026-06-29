import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3OOe_-WHYfiKIm4xH04ClUnfTyLtlw9Q",
  authDomain: "tech-store-de852.firebaseapp.com",
  projectId: "tech-store-de852",
  storageBucket: "tech-store-de852.firebasestorage.app",
  messagingSenderId: "19461438319",
  appId: "1:19461438319:web:332ddedc573fe8f5d6469a",
  measurementId: "G-Z6099YLXWZ",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;