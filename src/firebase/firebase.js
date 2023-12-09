// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjBIJu7IjW1T5TJYTPLDztokVNNO_HEx4",
  authDomain: "creaciones-divinas-af42c.firebaseapp.com",
  projectId: "creaciones-divinas-af42c",
  storageBucket: "creaciones-divinas-af42c.appspot.com",
  messagingSenderId: "523792875158",
  appId: "1:523792875158:web:88be38ba8b0d43dcce0cb7",
  measurementId: "G-W10641Y1DX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
