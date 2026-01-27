import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBOHoYiQbauZbFdeHHQBdVuZLbKO3jsyE8",
  authDomain: "dietirealestates25.firebaseapp.com",
  projectId: "dietirealestates25",
  storageBucket: "dietirealestates25.firebasestorage.app",
  messagingSenderId: "67836017082",
  appId: "1:67836017082:web:a9090a297dfe4ffa1d8583",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
