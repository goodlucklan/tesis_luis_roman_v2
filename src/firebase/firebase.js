// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEp1gUxG-JyGE-1SRFXtcR9KegHSNIUME",
  authDomain: "inventario-9ee5d.firebaseapp.com",
  projectId: "inventario-9ee5d",
  storageBucket: "inventario-9ee5d.appspot.com",
  messagingSenderId: "954221254920",
  appId: "1:954221254920:web:51e8c640c2af2f1b9a74bd",
  measurementId: "G-J52CQ40C7B",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
