import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Конфигурация Firebase
// Используются переменные окружения, если они установлены, иначе значения по умолчанию
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCoehrxtqk4wjwNAczrhIYzeKCGEyXu4GY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pro-mnemo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pro-mnemo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pro-mnemo.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "91922400060",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:91922400060:web:dca84c0db126b8b3dd5439",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7SJR2HLC8R"
};

// Инициализация Firebase
console.log('🔥 Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  hasApiKey: !!firebaseConfig.apiKey
});

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('✅ Firebase initialized successfully');

export default app;
