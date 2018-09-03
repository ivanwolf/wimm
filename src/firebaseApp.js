import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDoDRc6clLDFn6SQITBxlzIwXKotLIC480',
  authDomain: 'wimm-70965.firebaseapp.com',
  databaseURL: 'https://wimm-70965.firebaseio.com',
  projectId: 'wimm-70965',
  storageBucket: 'wimm-70965.appspot.com',
  messagingSenderId: '755630054891',
};


let firebaseApp = null;

export default () => {
  if (firebaseApp === null) {
    firebaseApp = firebase.initializeApp(config);
  }
  return firebaseApp;
};
