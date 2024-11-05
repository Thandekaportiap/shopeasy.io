// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import {  doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1fQPKgvqnshM7hyb1KaPrRmmE3BK4eZA",
  authDomain: "shopeasy-b66fd.firebaseapp.com",
  projectId: "shopeasy-b66fd",
  storageBucket: "shopeasy-b66fd.firebasestorage.app",
  messagingSenderId: "1012407518234",
  appId: "1:1012407518234:web:7c2e74e4b6abc1120cfda3",
  measurementId: "G-0LDDM3YWWN"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app); 
export {  doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove };

export default app;