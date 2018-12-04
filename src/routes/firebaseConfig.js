import firebaseApp from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAJb2Ey6t1vGfGCbEZHu3YDA4JTmXJ0my8",
  authDomain: "todolistserverapp.firebaseapp.com",
  databaseURL: "https://todolistserverapp.firebaseio.com",
  projectId: "todolistserverapp",
  storageBucket: "todolistserverapp.appspot.com",
  messagingSenderId: "816959137147"
};

export const Firebase = firebaseApp.initializeApp(config);

export const signInWithEmailAndPassword = (username, pass) => {
  console.log("signInWithEmailAndPassword");
  let authPromise = firebaseApp
    .auth()
    .signInWithEmailAndPassword(username, pass);
  return authPromise;
};

export const isAuthenticated = () =>
  firebaseApp.auth().currentUser ? true : false;

export const signOut = () => firebaseApp.auth().signOut();
