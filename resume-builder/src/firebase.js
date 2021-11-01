import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAokR70moc8zmJmCub1nq3AG5m2bV0WQnA",
    authDomain: "cbcn-80f78.firebaseapp.com",
    projectId: "cbcn-80f78",
    storageBucket: "cbcn-80f78.appspot.com",
    messagingSenderId: "592409748159",
    appId: "1:592409748159:web:27d1c8659fc938bec15c0a",
    measurementId: "G-LN3N3XXG61"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
export { db, auth }