import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Конфигурация Firebase из переменных окружения (Netlify / .env)
// Задайте VITE_FIREBASE_* в Netlify → Site configuration → Environment variables
const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) || '',
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || '',
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || '',
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || '',
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || '',
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || '',
};

console.log('🔥 Firebase Config:', {
  projectId: firebaseConfig.projectId || '(not set)',
  authDomain: firebaseConfig.authDomain || '(not set)',
  hasApiKey: !!firebaseConfig.apiKey,
});

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    'Firebase: задайте VITE_FIREBASE_API_KEY и VITE_FIREBASE_PROJECT_ID в Netlify (Environment variables) или в .env. См. FIREBASE_SETUP.md'
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('✅ Firebase initialized successfully');

export default app;
