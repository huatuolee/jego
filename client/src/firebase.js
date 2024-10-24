import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD3aSNPpZZF-Ct4JqdCGg045jxvU0yfkrU",
  authDomain: "jego-5f73c.firebaseapp.com",
  projectId: "jego-5f73c",
  storageBucket: "jego-5f73c.appspot.com",
  messagingSenderId: "814777866142",
  appId: "1:814777866142:web:fd1802605b8e4cd98c688f",
  measurementId: "G-S7HKW1WD2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

