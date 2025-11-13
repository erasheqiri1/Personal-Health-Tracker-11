import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4y1j8UE7CknC73unsg8ZhbnD9OKh9IaU",
  authDomain: "personal-health-trac.firebaseapp.com",
  projectId: "personal-health-trac",
  storageBucket: "personal-health-trac.firebasestorage.app",
  messagingSenderId: "586500508649",
  appId: "1:586500508649:web:8a14c07b75849f2cd01978"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;