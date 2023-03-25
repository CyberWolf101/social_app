import { initializeApp } from 'firebase/app'
import { getFirestore, } from 'firebase/firestore';
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD1WnfWRLSnItMbyfoTGCbqFOH8B3hB018",
  authDomain: "socialize-93618.firebaseapp.com",
  databaseURL: "https://socialize-93618-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "socialize-93618",
  storageBucket: "socialize-93618.appspot.com",
  messagingSenderId: "1057475720511",
  appId: "1:1057475720511:web:d99eb1faaef9e4d1cf4f8a",
  measurementId: "G-BWF1PVTD4W"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const storage = getStorage()

export const auth = getAuth()
