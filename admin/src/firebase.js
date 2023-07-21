// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm-rPJFbk92eLO8RPWvJLQAaQZN8ZTxpE",
  authDomain: "shop-a2adb.firebaseapp.com",
  projectId: "shop-a2adb",
  storageBucket: "shop-a2adb.appspot.com",
  messagingSenderId: "762935770397",
  appId: "1:762935770397:web:1b05c57f970915cc98f5f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;