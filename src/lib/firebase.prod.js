import Firebase from 'firebase';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/storage'

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from '../seed';

// const config = {
//   apiKey: "AIzaSyAeKmUtiMCR6KzR4eAO1RqnQLFB54qr6gQ",
//   authDomain: "da-student-connect.firebaseapp.com",
//   projectId: "da-student-connect",
//   storageBucket: "da-student-connect.appspot.com",
//   messagingSenderId: "126272022481",
//   appId: "1:126272022481:web:61f8e66c785373847ee2f0",
//   measurementId: "G-3T047Q9MFW"
// };

const firebase = Firebase.initializeApp({
    apiKey: "AIzaSyAeKmUtiMCR6KzR4eAO1RqnQLFB54qr6gQ",
    authDomain: "da-student-connect.firebaseapp.com",
    projectId: "da-student-connect",
    storageBucket: "da-student-connect.appspot.com",
    messagingSenderId: "126272022481",
    appId: "1:126272022481:web:61f8e66c785373847ee2f0",
    measurementId: "G-3T047Q9MFW"
  });
// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

const db = Firebase.firestore();
const auth = Firebase.auth();
const storage = Firebase.storage();

export { Firebase, firebase , db, auth, storage};
