import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyALKh9y6oUdB4cd5wH6hV2FgAg14Zu07l4",
  authDomain: "helloworld-f6193.firebaseapp.com",
  databaseURL: "https://helloworld-f6193-default-rtdb.firebaseio.com",
  projectId: "helloworld-f6193",
  storageBucket: "helloworld-f6193.appspot.com",
  messagingSenderId: "983590947139",
  appId: "1:983590947139:web:5169395235233b746947f6"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
