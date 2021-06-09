import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBCfeJwlEFM_DOdU2b-XM8d7R3v1O4JgWU",
    authDomain: "kchat-6edce.firebaseapp.com",
    projectId: "kchat-6edce",
    storageBucket: "kchat-6edce.appspot.com",
    messagingSenderId: "436390583285",
    appId: "1:436390583285:web:3ca05f9f9d55cacb205ebc",
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const auth = app.auth();
const db = app.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
