// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth ,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-CfDQ8o-GZjLH_PLhx7sQsviqQWVaU3c",
  authDomain: "react-project-95414.firebaseapp.com",
  projectId: "react-project-95414",
  storageBucket: "react-project-95414.appspot.com",
  messagingSenderId: "1019249237005",
  appId: "1:1019249237005:web:14aef7fa474cb8d3cdc944"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);

export const provider =new GoogleAuthProvider();

export const db =getFirestore(app)