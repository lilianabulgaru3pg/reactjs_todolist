import firebaseApp from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAJb2Ey6t1vGfGCbEZHu3YDA4JTmXJ0my8",
  authDomain: "todolistserverapp.firebaseapp.com",
  databaseURL: "https://todolistserverapp.firebaseio.com",
  projectId: "todolistserverapp",
  storageBucket: "todolistserverapp.appspot.com",
  messagingSenderId: "816959137147"
};

export const Firebase = firebaseApp.initializeApp(config);
export const Auth = firebaseApp.auth();
export const Database = firebaseApp.database();
export const Firestore = firebaseApp.firestore();
// Disable deprecated features
Firestore.settings({
  timestampsInSnapshots: true
});

export const signInWithEmailAndPassword = (username, pass) => {
  console.log("signInWithEmailAndPassword");
  let authPromise = Auth.signInWithEmailAndPassword(username, pass);
  return authPromise;
};

export const isAuthenticated = () => (Auth.currentUser ? true : false);

export const signOut = () => Auth.signOut();
