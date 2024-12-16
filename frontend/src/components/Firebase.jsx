// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import {  doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIcTiNJtPnoy_d41cV-IErNAFQoA73qjw",
  authDomain: "shop-easy-8946c.firebaseapp.com",
  projectId: "shop-easy-8946c",
  storageBucket: "shop-easy-8946c.firebasestorage.app",
  messagingSenderId: "614892388038",
  appId: "1:614892388038:web:730e91f9474d4053b021c7",
  measurementId: "G-R9QD0JT2S6"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 


export const db = getFirestore(app);
export const storage = getStorage(app); 
export {  doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, };

const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth, getFirestore, getAuth, getAnalytics, getStorage };
export default app;