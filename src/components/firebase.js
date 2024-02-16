import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import { getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBHJlYuTUgu7c5gTANAAP9TqCzK_pGnWYM",
    authDomain: "clone-netflix-ea28d.firebaseapp.com",
    projectId: "clone-netflix-ea28d",
    storageBucket: "clone-netflix-ea28d.appspot.com",
    messagingSenderId: "768864083551",
    appId: "1:768864083551:web:3c31f69c46ff3975d8c5ea"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };