import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtgXZYRNGUiNKjmE8LYJb-npwZ_bCAGy0",
  authDomain: "drivos-f8aec.firebaseapp.com",
  projectId: "drivos-f8aec",
  storageBucket: "drivos-f8aec.firebasestorage.app",
  messagingSenderId: "565072486222",
  appId: "1:565072486222:web:ce5070d05bd722be59c81f",
  measurementId: "G-SBZ5429CP4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
