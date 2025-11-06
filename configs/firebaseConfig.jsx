// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-1348a.firebaseapp.com",
  projectId: "ai-course-generator-1348a",
  storageBucket: "ai-course-generator-1348a.firebasestorage.app",
  messagingSenderId: "180820622320",
  appId: "1:180820622320:web:88ca69b65a97688d35bb35",
  measurementId: "G-VFV491VCP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);