// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2CRadFli3o5-VaYyOa6NeGQHKYAw43Cg",
  authDomain: "podcast-9c00e.firebaseapp.com",
  projectId: "podcast-9c00e",
  storageBucket: "podcast-9c00e.appspot.com",
  messagingSenderId: "969359812161",
  appId: "1:969359812161:web:56e01cf680d633909408c0",
  measurementId: "G-5LY1P3TQPB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
