import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBFJKQncNwPbKa8otd_JscuosUhxxthY5M",
  authDomain: "appresto2.firebaseapp.com",
  projectId: "appresto2",
  storageBucket: "appresto2.appspot.com",
  messagingSenderId: "61523398048",
  appId: "1:61523398048:web:5e3fd8b9e723fc36b1a8c5",
  // dataBaseUrl: ""
};

export const initFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(initFirebase)
