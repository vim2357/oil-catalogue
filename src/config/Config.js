import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCiinXtMYlnAkWe114ds0nC9r3-uT8JIYk",
    authDomain: "formula-oil.firebaseapp.com",
    projectId: "formula-oil",
    storageBucket: "formula-oil.appspot.com",
    messagingSenderId: "286954421915",
    appId: "1:286954421915:web:df03cbe9e937c8b9f9503e",
    measurementId: "G-SB1PG37B5T"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()

  export {auth, db, storage}
  

  