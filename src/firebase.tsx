import * as firebase from "firebase";
import { firestore } from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  apiId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp( firebaseConfig );
export const store: firestore.Firestore = firebase.firestore();

export default firebase;
