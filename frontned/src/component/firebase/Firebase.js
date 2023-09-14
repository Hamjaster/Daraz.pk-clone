// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlAee8pAF6yzOcmR6V8sPNcmftbRYATxg",
    authDomain: "daraz-clone-1beab.firebaseapp.com",
    projectId: "daraz-clone-1beab",
    storageBucket: "daraz-clone-1beab.appspot.com",
    messagingSenderId: "331120664694",
    appId: "1:331120664694:web:120374edcacd29e0de7f57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)



