// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_XQLYTLiV6FGof7jMciK66yD6hpIbSvo",
    authDomain: "bookproject-70431.firebaseapp.com",
    projectId: "bookproject-70431",
    storageBucket: "bookproject-70431.appspot.com",
    messagingSenderId: "108372509514",
    appId: "1:108372509514:web:fc995deb323a22a742b7b3",
    measurementId: "G-FD1YDDL81T"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
