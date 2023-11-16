// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzyZ8QMSCR6tFAkWc69do1SyWhWYGi0EY",
    authDomain: "ha-pj-a27a8.firebaseapp.com",
    projectId: "ha-pj-a27a8",
    storageBucket: "ha-pj-a27a8.appspot.com",
    messagingSenderId: "203669591220",
    appId: "1:203669591220:web:c1d1a6aa865d2db9bab3e1",
    measurementId: "G-P0BQ1HH1RJ"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
