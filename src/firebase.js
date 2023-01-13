// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1SgXSEj84yDW0J6EJEZMl2GzO5lmO-SU",
  authDomain: "realesstate-1312.firebaseapp.com",
  projectId: "realesstate-1312",
  storageBucket: "realesstate-1312.appspot.com",
  messagingSenderId: "730451443358",
  appId: "1:730451443358:web:07fa979c14ba641815c58f",
  measurementId: "G-9MT2LY6ZR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth= getAuth();
export const storage = getStorage(app);
export const db= getFirestore();