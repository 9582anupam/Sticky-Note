// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_DEmbotKkUw3qpe7i5kJ4QOva0nuZDTw",
    authDomain: "sticky-note-9582.firebaseapp.com",
    projectId: "sticky-note-9582",
    storageBucket: "sticky-note-9582.appspot.com",
    messagingSenderId: "604125189156",
    appId: "1:604125189156:web:81580159c22793ee7b34b1",
    measurementId: "G-C8L5GFFV4S",
    databaseURL:
        "https://sticky-note-9582-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    db,
};
