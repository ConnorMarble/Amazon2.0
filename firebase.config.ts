/* eslint-disable no-unused-vars */
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC3EwaaWUrxP8iByXlW8plmyzW9QZJCDbw",
  authDomain: "fir-d5171.firebaseapp.com",
  projectId: "fir-d5171",
  storageBucket: "fir-d5171.appspot.com",
  messagingSenderId: "158555298847",
  appId: "1:158555298847:web:0e6938a9b045bc00f1c92a",
};
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
