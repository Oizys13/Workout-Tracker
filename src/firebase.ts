
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtUfaxLThqMPtpmOHKqevidHMzfNxrlTY",
  authDomain: "workout-tracker-7b9a8.firebaseapp.com",
  projectId: "workout-tracker-7b9a8",
  storageBucket: "workout-tracker-7b9a8.firebasestorage.app",
  messagingSenderId: "996101874284",
  appId: "1:996101874284:web:818ae033a36b4505b62e49"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };