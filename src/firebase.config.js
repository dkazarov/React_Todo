import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCVhAK7ugBx8Lu2KpOs1y8QOxKd8CB2PlE',
  authDomain: 'todo-2ed09.firebaseapp.com',
  databaseURL:
    'https://todo-2ed09-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-2ed09',
  storageBucket: 'todo-2ed09.appspot.com',
  messagingSenderId: '727384853001',
  appId: '1:727384853001:web:8ba5d47093ca3a66d846d8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
