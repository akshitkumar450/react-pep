import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import { documentReducer } from "./reducers/documentReducer";
import { educationReducer } from "./reducers/educationReducer";
import { contactReducer } from "./reducers/contactReducer";
import thunk from 'redux-thunk'
import firebase from 'firebase'

import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore'
import { firebaseReducer, getFirebase } from 'react-redux-firebase'
import { authReducer } from "./reducers/authReducer";

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
export const db = firebaseApp.firestore()
export const auth = firebase.auth()

const rootReducer = combineReducers({
    document: documentReducer,
    education: educationReducer,
    contact: contactReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer
})

//binding for redux to get firestore
export const store =
    createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })), reduxFirestore(firebase)))