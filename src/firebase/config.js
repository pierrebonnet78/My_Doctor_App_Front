// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxBSbFhtug3PKV7Q-frWSHkK-KMewpqWs",
  authDomain: "my-doctor-app-79280.firebaseapp.com",
  projectId: "my-doctor-app-79280",
  storageBucket: "my-doctor-app-79280.appspot.com",
  messagingSenderId: "542961511083",
  appId: "1:542961511083:web:a32a341d138f6ec8ae65ee",
  measurementId: "G-YKQH5F5G5L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentification = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const defaultProfileImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/my-doctor-app-79280.appspot.com/o/photos%2Fdefault%2FAccount_Porfile.png?alt=media&token=8f878714-7f09-46ba-bb94-a6c79361f655";
