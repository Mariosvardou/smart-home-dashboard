// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";;
const firebaseConfig = {
 apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "smart-home-dashboard-ff918",
  storageBucket: "smart-home-dashboard-ff918.firebasestorage.app",
  messagingSenderId: "667720826152",
  appId: "1:667720826152:web:406ad46b10b1a615ffe41d",
  measurementId: "G-XVGCX868QL"

};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);