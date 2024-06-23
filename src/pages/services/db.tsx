


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA6cL0-UPDvTqBL5z-pedmo2SxHHZFmnbo",
  authDomain: "tarefas-plus-e5811.firebaseapp.com",
  projectId: "tarefas-plus-e5811",
  storageBucket: "tarefas-plus-e5811.appspot.com",
  messagingSenderId: "900463185673",
  appId: "1:900463185673:web:46909862066faf97b70dd8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;
