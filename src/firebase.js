// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvCj95rxJ4lEQKE61oeCNhh44y64-vG6Q",
  authDomain: "financly-eccf2.firebaseapp.com",
  projectId: "financly-eccf2",
  storageBucket: "financly-eccf2.appspot.com",
  messagingSenderId: "49219255734",
  appId: "1:49219255734:web:23fc5f3a5402d91d999517",
  measurementId: "G-9EMLB9KBJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider, doc, setDoc};