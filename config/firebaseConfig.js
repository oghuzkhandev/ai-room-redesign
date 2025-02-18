import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-redesign-62f0a.firebaseapp.com",
  projectId: "ai-redesign-62f0a",
  storageBucket: "ai-redesign-62f0a.firebasestorage.app",
  messagingSenderId: "64807965703",
  appId: "1:64807965703:web:805a2d3658a4d7ebd306a2",
  measurementId: "G-P5DXTR37CV",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
