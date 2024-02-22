// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmgr8Fqe41TqNupczTAyBqk7Tm0bDZp9g",
  authDomain: "home-1ab24.firebaseapp.com",
  databaseURL: "https://home-1ab24-default-rtdb.firebaseio.com",
  projectId: "home-1ab24",
  storageBucket: "home-1ab24.appspot.com",
  messagingSenderId: "680163954385",
  appId: "1:680163954385:web:5bf4263599605686cbfff0",
  measurementId: "G-LFC8VFLGKV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);