
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Importa otras funciones si las necesitas, por ejemplo, Firestore
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuración de tu aplicación web Firebase
const firebaseConfig = {

  apiKey: "AIzaSyBHNN_5X4WnOSOK7my8uRfvtAAEexTLwrE",
  authDomain: "movileshibrida.firebaseapp.com",
  projectId: "movileshibrida",
  storageBucket: "movileshibrida.appspot.com",
  messagingSenderId: "28336147441",
  appId: "1:28336147441:web:e6b5b41a301d1e365e9250",
  measurementId: "G-8KGQF9Q8E6"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Analytics (opcional)
const analytics = getAnalytics(app);

// Inicializa Firestore (si lo necesitas)
const db = getFirestore(app);

// Inicializa Firebase Authentication
const auth = getAuth(app);

const storage = getStorage(app);

export { app, analytics, db,auth, storage };

// Codigo de firebase