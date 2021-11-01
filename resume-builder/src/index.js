import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from 'firebase'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAokR70moc8zmJmCub1nq3AG5m2bV0WQnA",
  authDomain: "cbcn-80f78.firebaseapp.com",
  projectId: "cbcn-80f78",
  storageBucket: "cbcn-80f78.appspot.com",
  messagingSenderId: "592409748159",
  appId: "1:592409748159:web:27d1c8659fc938bec15c0a",
  measurementId: "G-LN3N3XXG61"
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={firebaseConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
  ,
  document.getElementById('root')
);