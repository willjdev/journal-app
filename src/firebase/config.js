// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID
} = getEnvironments();

//  Dev - Prod
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};

//console.log(firebaseConfig)



//  Testing
/* const firebaseConfig = {
  apiKey: "AIzaSyB7m9vfoDQzEd6hnF-4RVzD3TRNWubghxE",
  authDomain: "test-react-journal.firebaseapp.com",
  projectId: "test-react-journal",
  storageBucket: "test-react-journal.appspot.com",
  messagingSenderId: "196067522730",
  appId: "1:196067522730:web:7548f40b7e1f08f1e478d3"
}; */

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp ); //Todas la funcionalidades de autenticacion
export const FirebaseDB = getFirestore( FirebaseApp ); //Configuracion de la base de datos
