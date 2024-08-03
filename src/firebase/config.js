// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

console.log(import.meta.env.VITE_API_KEY);
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_BUCKET,
    messagingSenderId: import.meta.env.VITE_SENDER,
    appId: import.meta.env.VITE_APP
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firebasedeki auth yapısının referansını alma
export const auth = getAuth(app);

// google saglayıcının kurulumu

export const provider = new GoogleAuthProvider();

// ver, tabanının referansını al
export const db = getFirestore(app);