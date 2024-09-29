import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // AUTH

// configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBSx2ctNkhUtbnS1MitCN7sgbgq3wiXgkI",
  authDomain: "certpalestras.firebaseapp.com",
  projectId: "certpalestras",
  storageBucket: "certpalestras.appspot.com",
  messagingSenderId: "931185678644",
  appId: "1:931185678644:web:eaaa37326d09fddb4a2d61",
  measurementId: "G-WKT68VVE7H",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Se você precisar de autenticação

export { db, auth };
