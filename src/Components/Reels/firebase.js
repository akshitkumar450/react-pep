import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBI5oVHQCSZx34MjjTJMajj25GXAOt-vJc",
    authDomain: "reels-project-3a271.firebaseapp.com",
    projectId: "reels-project-3a271",
    storageBucket: "reels-project-3a271.appspot.com",
    messagingSenderId: "445962300738",
    appId: "1:445962300738:web:8606eea0a70f54ebd7acdb",
    measurementId: "G-HE8P3DB294"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
// to upload files
const storage = firebase.storage()
export { db, auth, storage }

